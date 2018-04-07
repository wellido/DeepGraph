package controller.project;

import com.intellij.openapi.components.ProjectComponent;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowAnchor;
import com.intellij.openapi.wm.ToolWindowManager;
import com.intellij.ui.content.Content;
import com.intellij.ui.content.ContentFactory;
import view.TbViewer;

import javax.swing.*;

public class TbGraphViewComponent implements ProjectComponent {
    public static final String ID_TOOL_WINDOW = "TbGraphView";
    private Project _project;
    private TbViewer _tbViewer;
    public TbGraphViewComponent(Project project) {
        this._project = project;
        initToolWindow();
        System.out.println("hahaah");
    }

    public void initToolWindow() {
        this._tbViewer = new TbViewer();
        ToolWindowManager toolWindowManager = ToolWindowManager.getInstance(this._project);
        ToolWindow toolWindow = toolWindowManager.registerToolWindow(TbGraphViewComponent.ID_TOOL_WINDOW,false, ToolWindowAnchor.RIGHT);
        final Content content = ContentFactory.SERVICE.getInstance().createContent(getViewerPanel(),"",false);
        content.setCloseable(false);
        toolWindow.getContentManager().addContent(content);
    }
    public TbViewer getViewerPanel() {
       return this._tbViewer;
    }
}
