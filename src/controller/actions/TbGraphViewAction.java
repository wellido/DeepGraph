package controller.actions;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowManager;


import view.TbViewer;
import controller.project.TbGraphViewComponent;

public class TbGraphViewAction extends AnAction {
    private ToolWindow getToolWindow(Project project) {
        System.out.println(ToolWindowManager.getInstance(project).getToolWindow("TbGraphView"));
        return ToolWindowManager.getInstance(project).getToolWindow("TbGraphView");
    }

    private Project getProject(AnActionEvent event) {
        return (Project) event.getDataContext().getData("project");
    }
//    TbViewer tbViewer = new TbViewer();


    public void actionPerformed(AnActionEvent event) {
        Project project = getProject(event);
        System.out.println(project);
        TbViewer tbViewer =   new TbGraphViewComponent(project).getViewerPanel();
        System.out.println(tbViewer);
        ToolWindow toolWindow = getToolWindow(project);
        System.out.println(toolWindow);
        toolWindow.activate(tbViewer);
    }
}
