"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  intelligentShiftAssignment,
  type IntelligentShiftAssignmentOutput,
} from "@/ai/flows/intelligent-shift-assignment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { employees } from "@/lib/data";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  shiftDetails: z.string().min(10, "Please provide more details about the shift."),
  availableTools: z.string().min(3, "Please list at least one available tool."),
});

const employeeDirectory = JSON.stringify(
  employees.map((e) => ({
    name: e.name,
    role: e.role,
    skills: e.skills,
    certifications: e.certifications,
    availability: e.availability,
  })),
  null,
  2
);

export function CreateShiftForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IntelligentShiftAssignmentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shiftDetails: "",
      availableTools: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await intelligentShiftAssignment({
        ...values,
        employeeDirectory,
      });
      setResult(output);
    } catch (e: any) {
      setError("An error occurred while generating assignments. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="shiftDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'Morning warehouse shift, 8 AM - 4 PM. Requires one forklift operator and one picker.'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableTools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Tools & Equipment</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., 'Forklift, Pallet Jack, Barcode Scanner'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Suggestions
          </Button>
        </form>
      </Form>

      {error && (
        <div className="mt-4 text-sm font-medium text-destructive">{error}</div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <Separator />
          <h3 className="text-lg font-semibold">AI-Powered Suggestions</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Suggested Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.suggestedAssignments}</p>
            </CardContent>
          </Card>
           {result.potentialConflicts && result.potentialConflicts.toLowerCase() !== 'none' && (
            <Card className="border-destructive/50">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <CardTitle className="text-base text-destructive">Potential Conflicts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-destructive">{result.potentialConflicts}</p>
              </CardContent>
            </Card>
           )}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rationale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.rationale}</p>
            </CardContent>
          </Card>
          <Button className="w-full" variant="default">
            Accept and Create Shift
          </Button>
        </div>
      )}
    </div>
  );
}
