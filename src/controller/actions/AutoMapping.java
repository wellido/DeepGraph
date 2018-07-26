package controller.actions;
import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.actionSystem.CommonDataKeys;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.project.Project;
import com.intellij.psi.PsiFile;
import controller.project.HighlightComponent;
import controller.project.JSReturnName;
import controller.project.ReadCodes;

import java.util.HashMap;
import java.util.Map;

public class AutoMapping extends AnAction {
    JSReturnName jsReturnName = new JSReturnName();
    Map<String, int[]> KeyWordMaps = new HashMap<String, int[]>();
    private Project getProject(AnActionEvent event) {
        return (Project) event.getDataContext().getData("project");
    }
    @Override
    public void actionPerformed(AnActionEvent e) {
        // TODO: insert action logic here
        Project project = getProject(e);
        Editor editor = e.getRequiredData(CommonDataKeys.EDITOR);
        PsiFile psiFile = e.getRequiredData(CommonDataKeys.PSI_FILE);
        String CodeString = psiFile.getText();
        ReadCodes readCodes = new ReadCodes();
        KeyWordMaps = readCodes.execute(CodeString);
        String str = '\'' + jsReturnName.namereturn + '\'';
        if (KeyWordMaps.get(str) != null) {
            System.out.println("test       "  + KeyWordMaps.get(str)[0] + " " +  KeyWordMaps.get(str)[1]);
            HighlightComponent highlightComponent = new HighlightComponent();
            highlightComponent.highlightTest(project, editor, KeyWordMaps.get(str)[0], KeyWordMaps.get(str)[1]);
        } else {
            System.out.println("Can't find this code!");
        }
    }
}
