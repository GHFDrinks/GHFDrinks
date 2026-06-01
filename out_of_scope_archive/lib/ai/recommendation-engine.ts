/**
 * Core AI Recommendation Engine Abstraction
 * 
 * This module encapsulates the logic for generating presentation recommendations
 * based on venue types, client preferences, and seasonal intelligence.
 * Designed to easily swap out mock/heuristic logic for a real ML model later.
 */

export interface ContextParams {
  venueType: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  clientTier: 'Platinum' | 'Gold' | 'Silver' | 'Standard';
  focusCategory?: string;
}

export interface RecommendationResult {
  brands: string[];
  activations: string[];
  confidenceScore: number;
  reasoning: string[];
}

export class RecommendationEngine {
  
  /**
   * Generates a smart presentation sequence and brand recommendations based on contextual data.
   */
  static async generateCuratedPitch(context: ContextParams): Promise<RecommendationResult> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const recommendations: RecommendationResult = {
      brands: [],
      activations: [],
      confidenceScore: 0,
      reasoning: []
    };

    // Heuristic Logic (To be replaced by ML model)
    
    // 1. Seasonal Logic
    if (context.season === 'Summer') {
      recommendations.brands.push('Maison Mirabeau', 'Double Dutch');
      recommendations.reasoning.push('Summer seasonality strongly favors Rosé and premium mixers.');
      recommendations.confidenceScore += 30;
    } else if (context.season === 'Winter') {
      recommendations.brands.push('Sapling Spirits');
      recommendations.reasoning.push('Winter seasonality favors dark spirits and sustainable gifting.');
      recommendations.confidenceScore += 30;
    }

    // 2. Venue Type Logic
    if (context.venueType === 'Luxury Hotel') {
      recommendations.brands.push('Everleaf');
      recommendations.activations.push('In-Room Mini Bar Placement');
      recommendations.reasoning.push('Luxury Hotels are currently expanding premium non-alcoholic options.');
      recommendations.confidenceScore += 40;
    } else if (context.venueType === 'Cocktail Bar') {
      recommendations.brands.push('Sapling Spirits');
      recommendations.activations.push('Guest Bartender Shift');
      recommendations.reasoning.push('Cocktail bars index high on sustainable back-bar staples.');
      recommendations.confidenceScore += 45;
    }

    // 3. Client Tier Logic
    if (context.clientTier === 'Platinum') {
      recommendations.activations.push('Exclusive Founder Tasting');
      recommendations.reasoning.push('Platinum accounts qualify for bespoke founder-led experiences.');
      recommendations.confidenceScore += 15;
    }

    // Deduplicate arrays
    recommendations.brands = [...new Set(recommendations.brands)];
    recommendations.activations = [...new Set(recommendations.activations)];
    
    // Normalize score
    recommendations.confidenceScore = Math.min(recommendations.confidenceScore, 98);

    return recommendations;
  }

  /**
   * Scores an existing presentation based on engagement potential.
   */
  static scorePresentation(brandsIncluded: string[], clientPreferences: string[]): number {
    let score = 50; // Base score
    
    const overlap = brandsIncluded.filter(brand => clientPreferences.includes(brand));
    score += (overlap.length * 15);
    
    // Penalty for too many brands (overwhelming)
    if (brandsIncluded.length > 5) score -= 10;
    
    return Math.min(score, 100);
  }
}
