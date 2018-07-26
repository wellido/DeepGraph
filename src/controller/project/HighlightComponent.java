package controller.project;

import com.intellij.codeInsight.highlighting.HighlightManager;
import com.intellij.codeInsight.highlighting.HighlightManagerImpl;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.editor.colors.EditorColors;
import com.intellij.openapi.editor.colors.EditorColorsManager;
import com.intellij.openapi.editor.markup.RangeHighlighter;
import com.intellij.openapi.editor.markup.TextAttributes;
import com.intellij.openapi.project.Project;

public class HighlightComponent {
    public static void highlightTest(Project project, Editor editor, int Pos1, int Pos2) {
        final HighlightManager highlightManager = HighlightManager.getInstance(project);
        final RangeHighlighter[] highlighters =
                ((HighlightManagerImpl) highlightManager).getHighlighters(editor);
        for (RangeHighlighter highlighter : highlighters) {
            highlightManager.removeSegmentHighlighter(editor, highlighter);
        }

        EditorColorsManager colorsManager = EditorColorsManager.getInstance();
        final TextAttributes attributes = colorsManager.getGlobalScheme().getAttributes(EditorColors.TEXT_SEARCH_RESULT_ATTRIBUTES);
        highlightManager.addOccurrenceHighlight(editor, Pos1, Pos2, attributes, HighlightManager.HIDE_BY_TEXT_CHANGE, null, null);

    }
}
