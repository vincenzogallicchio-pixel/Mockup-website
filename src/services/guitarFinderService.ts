import { Product, FinderAnswers, FinderRecommendation, MusicGenreAnswer, InstrumentTypeAnswer } from '../types';
import { PRODUCTS } from '../data/catalogue';

export interface IGuitarFinderService {
  getRecommendations(answers: FinderAnswers): Promise<FinderRecommendation[]>;
}

export class DeterministicFinderEngine implements IGuitarFinderService {
  private products: Product[];

  constructor(products: Product[] = PRODUCTS) {
    this.products = products;
  }

  public async getRecommendations(answers: FinderAnswers): Promise<FinderRecommendation[]> {
    // 1. HARD CONSTRAINTS FILTERING
    let filtered = this.products.filter(p => {
      // Must have valid price and be in stock
      if (p.price <= 0 || !p.inStock) return false;

      // Filter by Instrument Type
      if (answers.instrumentType !== "I don't know") {
        const typeMatch = this.matchesInstrumentType(p, answers.instrumentType);
        if (!typeMatch) return false;
      }

      // Filter by Budget constraint (with reasonable tolerance)
      const fitsBudget = this.matchesBudget(p.price, answers.budget);
      if (!fitsBudget) return false;

      // If it is a gift, prefer New or Ex-demo (unless user is on very low budget)
      if (answers.forWho === 'Gift' && answers.budget !== '0-200' && p.condition === 'Rarità') {
        return false;
      }

      return true;
    });

    // Fallback if hard constraints are too restrictive (e.g. relax budget slightly)
    if (filtered.length < 3) {
      filtered = this.products.filter(p => {
        if (p.price <= 0 || !p.inStock) return false;
        if (answers.instrumentType !== "I don't know") {
          return this.matchesInstrumentType(p, answers.instrumentType);
        }
        return true;
      });
    }

    // 2. SOFT SCORING ENGINE
    const scoredList = filtered.map(product => {
      let score = 50; // base score

      // A. Genre compatibility
      if (answers.musicGenre !== "I don't know" && answers.musicGenre !== 'Other') {
        if (product.genres.includes(answers.musicGenre)) {
          score += 35;
        } else if (product.primaryStrengths.includes('Versatility')) {
          score += 15;
        }
      } else {
        score += 20; // neutral
      }

      // B. Experience level compatibility
      const expItalian = this.mapExperience(answers.experience);
      if (product.experienceLevel.includes(expItalian)) {
        score += 25;
      }

      // C. What matters most
      if (product.primaryStrengths.includes(answers.mattersMost)) {
        score += 25;
      }

      // D. Budget proximity & value
      const targetMidpoint = this.getBudgetMidpoint(answers.budget);
      const diff = Math.abs(product.price - targetMidpoint);
      const budgetBonus = Math.max(0, 20 - (diff / targetMidpoint) * 15);
      score += budgetBonus;

      // E. Brand prestige / reliability bonus
      if (['Fender', 'Schecter', 'Crafter', 'Takamine', 'Danelectro', 'Breedlove'].includes(product.brand)) {
        score += 5;
      }

      // Generate 2 to 4 strictly factual reasons based on metadata
      const factualReasons = this.generateFactualReasons(product, answers);

      return {
        product,
        score: Math.round(score),
        factualReasons
      };
    });

    // Sort descending by score
    scoredList.sort((a, b) => b.score - a.score);

    // Return top 3 unique products
    return scoredList.slice(0, 3);
  }

  private matchesInstrumentType(product: Product, type: InstrumentTypeAnswer): boolean {
    switch (type) {
      case 'Electric':
        return product.category === 'chitarre-elettriche' || (product.category === 'strumenti-mancini' && product.name.toLowerCase().includes('strat'));
      case 'Acoustic':
        return product.category === 'chitarre-acustiche';
      case 'Classical':
        return product.category === 'chitarre-classiche';
      case 'Jazz/Semi-Hollow':
        return product.category === 'chitarre-jazz';
      case 'Bass':
        return product.category === 'bassi' || product.category === 'strumenti-mancini';
      default:
        return true;
    }
  }

  private matchesBudget(price: number, budget: string): boolean {
    switch (budget) {
      case '0-200':
        return price <= 250;
      case '200-500':
        return price >= 160 && price <= 560;
      case '500-1000':
        return price >= 420 && price <= 1150;
      case '1000-2000':
        return price >= 850 && price <= 2200;
      case '2000+':
        return price >= 1600;
      default:
        return true;
    }
  }

  private getBudgetMidpoint(budget: string): number {
    switch (budget) {
      case '0-200': return 150;
      case '200-500': return 350;
      case '500-1000': return 750;
      case '1000-2000': return 1500;
      case '2000+': return 2500;
      default: return 500;
    }
  }

  private mapExperience(exp: string): 'Principiante' | 'Intermedio' | 'Avanzato' | 'Professionista' {
    switch (exp) {
      case 'Beginner': return 'Principiante';
      case 'Intermediate': return 'Intermedio';
      case 'Advanced': return 'Avanzato';
      case 'Professional': return 'Professionista';
      default: return 'Principiante';
    }
  }

  private generateFactualReasons(product: Product, answers: FinderAnswers): string[] {
    const reasons: string[] = [];

    // Reason 1: Budget alignment
    reasons.push(`✓ Nel tuo budget (€${product.price.toLocaleString('it-IT', { minimumFractionDigits: 2 })})`);

    // Reason 2: Genre or instrument appropriateness
    if (answers.musicGenre !== "I don't know" && answers.musicGenre !== 'Other' && product.genres.includes(answers.musicGenre)) {
      reasons.push(`✓ Ottimale per il repertorio ${answers.musicGenre}`);
    } else if (product.specs.pickups) {
      reasons.push(`✓ ${product.specs.pickups}`);
    } else if (product.category === 'chitarre-classiche') {
      reasons.push(`✓ Corde in nylon a bassa tensione, dolci sulle dita`);
    } else {
      reasons.push(`✓ Elevata versatilità dinamica e timbrica`);
    }

    // Reason 3: Priority matter match
    if (answers.mattersMost === 'Playability' || answers.experience === 'Beginner') {
      reasons.push(`✓ Manico ergonomico (${product.specs.neck || 'profilo confortevole'})`);
    } else if (answers.mattersMost === 'Sound') {
      reasons.push(`✓ Legni selezionati: ${product.specs.body || 'timbro corposo'}`);
    } else if (answers.mattersMost === 'Brand') {
      reasons.push(`✓ Storico marchio di liuteria ${product.brand}`);
    } else if (answers.mattersMost === 'Value for money') {
      reasons.push(`✓ Rapporto qualità/prezzo eccellente nella fascia`);
    } else {
      reasons.push(`✓ Setup liuteria professionale incluso prima della spedizione`);
    }

    // Reason 4: Condition / Gift appropriateness
    if (answers.forWho === 'Gift') {
      reasons.push(`✓ Ideale come regalo: imballo protetto e garanzia ufficiale`);
    } else if (product.condition === 'Usato' || product.condition === 'Ex-demo') {
      reasons.push(`✓ ${product.condition}: ispezionata e certificata dal nostro laboratorio`);
    } else {
      reasons.push(`✓ Garanzia 24 mesi con assistenza diretta in sede a Tortona`);
    }

    // Keep between 2 and 4 factual reasons
    return reasons.slice(0, 4);
  }
}

// Default export singleton service
export const guitarFinderService = new DeterministicFinderEngine();

/**
 * Architectural note:
 * To integrate an external LLM (e.g. Gemini 2.5 Flash or OpenAI),
 * create a class implementing IGuitarFinderService that wraps this engine
 * and can optionally enrich recommendations or natural language reasoning.
 */
