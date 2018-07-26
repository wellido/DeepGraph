package controller.actions;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowManager;
import controller.project.DeepGraphViewer;
import controller.project.DeepGraphViewComponent;
import controller.project.RunTBPython;
import controller.project.CommonData;
import controller.project.JSReturnName;

public class DeepGraphViewAction extends AnAction {
    private ToolWindow getToolWindow(Project project) {
        return ToolWindowManager.getInstance(project).getToolWindow("TbGraphView");
    }

    private Project getProject(AnActionEvent event) {
        return (Project) event.getDataContext().getData("project");
    }
    JSReturnName jsReturnName = new JSReturnName();
    String FlagName = jsReturnName.getValue();
    public void actionPerformed(AnActionEvent event) {
        System.out.println(event);
        System.out.println(event.getDataContext());
        CommonData strObj = new CommonData();
        Project project = getProject(event);
        RunTBPython runtest = new RunTBPython();
        strObj.str = runtest.getPythonConfiguration(project);
        DeepGraphViewer deepGraphViewer =  new DeepGraphViewComponent(project).getViewerPanel();
        ToolWindow toolWindow = getToolWindow(project);
        toolWindow.activate(deepGraphViewer);
        if (FlagName != jsReturnName.getValue()) {
            System.out.println("Here");
        }
    }
}
