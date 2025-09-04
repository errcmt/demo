'use server';

/**
 * @fileOverview A flow for intelligent shift assignment based on employee skills, availability, and tool certifications.
 *
 * - intelligentShiftAssignment - A function that suggests optimal employee shift assignments.
 * - IntelligentShiftAssignmentInput - The input type for the intelligentShiftAssignment function.
 * - IntelligentShiftAssignmentOutput - The return type for the intelligentShiftAssignment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentShiftAssignmentInputSchema = z.object({
  shiftDetails: z
    .string()
    .describe('Details of the shift, including date, time, and required roles.'),
  employeeDirectory: z
    .string()
    .describe(
      'A list of employees with their skills, availability, and tool certifications.'
    ),
  availableTools: z.string().describe('A list of available tools for the shift.'),
});
export type IntelligentShiftAssignmentInput = z.infer<
  typeof IntelligentShiftAssignmentInputSchema
>;

const IntelligentShiftAssignmentOutputSchema = z.object({
  suggestedAssignments: z
    .string()
    .describe(
      'A list of suggested employee assignments for the shift, including names and roles.'
    ),
  potentialConflicts: z
    .string()
    .describe(
      'Any potential scheduling conflicts or skill mismatches identified.'
    ),
  rationale: z
    .string()
    .describe(
      'Explanation for the suggested assignments, considering skills, availability, and tool certifications.'
    ),
});
export type IntelligentShiftAssignmentOutput = z.infer<
  typeof IntelligentShiftAssignmentOutputSchema
>;

export async function intelligentShiftAssignment(
  input: IntelligentShiftAssignmentInput
): Promise<IntelligentShiftAssignmentOutput> {
  return intelligentShiftAssignmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentShiftAssignmentPrompt',
  input: {schema: IntelligentShiftAssignmentInputSchema},
  output: {schema: IntelligentShiftAssignmentOutputSchema},
  prompt: `You are an expert scheduling assistant. Given the shift details, employee directory, and available tools, suggest the optimal employee shift assignments.

Shift Details: {{{shiftDetails}}}
Employee Directory: {{{employeeDirectory}}}
Available Tools: {{{availableTools}}}

Consider employee skills, availability, and tool certifications to minimize scheduling conflicts and maximize productivity.
Return the suggested assignments, any potential conflicts, and the rationale for the assignments.`,
});

const intelligentShiftAssignmentFlow = ai.defineFlow(
  {
    name: 'intelligentShiftAssignmentFlow',
    inputSchema: IntelligentShiftAssignmentInputSchema,
    outputSchema: IntelligentShiftAssignmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
