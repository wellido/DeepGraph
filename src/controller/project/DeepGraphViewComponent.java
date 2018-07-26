package controller.project;

import com.intellij.openapi.components.ProjectComponent;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowAnchor;
import com.intellij.openapi.wm.ToolWindowManager;
import com.intellij.ui.content.Content;
import com.intellij.ui.content.ContentFactory;

public class DeepGraphViewComponent implements ProjectComponent {
    public static final String ID_TOOL_WINDOW = "TbGraphView";
    private Project _project;
    private DeepGraphViewer _deepGraphViewer;
    public DeepGraphViewComponent(Project project) {
        this._project = project;
        initToolWindow();
    }

    public void initToolWindow() {
        this._deepGraphViewer = new DeepGraphViewer();
        ToolWindowManager toolWindowManager = ToolWindowManager.getInstance(this._project);
        ToolWindow toolWindow = toolWindowManager.registerToolWindow(DeepGraphViewComponent.ID_TOOL_WINDOW,false, ToolWindowAnchor.RIGHT);
        final Content content = ContentFactory.SERVICE.getInstance().createContent(getViewerPanel(),"",false);
        content.setCloseable(false);
        toolWindow.getContentManager().addContent(content);
    }
    public DeepGraphViewer getViewerPanel() {
       return this._deepGraphViewer;
    }
}
