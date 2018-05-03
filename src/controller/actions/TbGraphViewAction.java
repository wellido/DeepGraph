package controller.actions;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowManager;


import view.TbViewer;
import controller.project.TbGraphViewComponent;
import controller.project.RunTBPython;

public class TbGraphViewAction extends AnAction {
    private ToolWindow getToolWindow(Project project) {
        return ToolWindowManager.getInstance(project).getToolWindow("TbGraphView");
    }

    private Project getProject(AnActionEvent event) {
        return (Project) event.getDataContext().getData("project");
    }


    public void actionPerformed(AnActionEvent event) {
        Project project = getProject(event);
        RunTBPython runtest = new RunTBPython();
        runtest.getPythonConfiguration(project);
        TbViewer tbViewer =  new TbGraphViewComponent(project).getViewerPanel();
        ToolWindow toolWindow = getToolWindow(project);
        toolWindow.activate(tbViewer);
    }
}
