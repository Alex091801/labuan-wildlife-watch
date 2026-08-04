import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FileImage, FileText, Loader2 } from "lucide-react";

const OPTIONS = [
  "Include map",
  "Include priority areas",
  "Include environmental conditions",
  "Include model explanation",
  "Include limitations and disclaimer",
];

export function ExportReportDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [checked, setChecked] = useState<string[]>(OPTIONS);

  const toggle = (option: string) =>
    setChecked((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );

  const run = (format: string) => {
    setBusy(format);
    setTimeout(() => {
      setBusy(null);
      onOpenChange(false);
      toast.success("Demonstration report prepared successfully.", {
        description: `${format} export simulated — no file is generated in this prototype.`,
      });
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate 24-Hour Risk Summary</DialogTitle>
          <DialogDescription>
            Demonstration export for the research prototype. No official APM report is produced.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="export-date">Forecast date</Label>
            <Input id="export-date" type="date" defaultValue="2026-08-04" />
          </div>
          <div className="space-y-2.5">
            {OPTIONS.map((option) => (
              <div key={option} className="flex items-center gap-2.5">
                <Checkbox
                  id={option}
                  checked={checked.includes(option)}
                  onCheckedChange={() => toggle(option)}
                />
                <Label htmlFor={option} className="text-sm font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => run("PDF")} disabled={busy !== null}>
            {busy === "PDF" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            Export as PDF
          </Button>
          <Button onClick={() => run("PNG")} disabled={busy !== null}>
            {busy === "PNG" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileImage className="h-4 w-4" />
            )}
            Export as PNG
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
