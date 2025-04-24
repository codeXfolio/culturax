import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface AiSuggestionBoxProps {
  title: string
  suggestion: string
}

export function AiSuggestionBox({ title, suggestion }: AiSuggestionBoxProps) {
  return (
    <Card className="border border-purple-500/20 bg-purple-500/5 overflow-hidden">
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-purple-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium mb-1">{title}</h4>
            <p className="text-xs text-muted-foreground">{suggestion}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
