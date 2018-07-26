package controller.project;

import javafx.application.Platform;
import javafx.beans.value.ChangeListener;
import javafx.concurrent.Worker;
import javafx.geometry.HPos;
import javafx.geometry.VPos;
import javafx.scene.Scene;
import javafx.scene.layout.Region;
import javafx.scene.paint.Color;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.embed.swing.JFXPanel;
import netscape.javascript.JSObject;
import javax.swing.*;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker.State;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

public class DeepGraphViewer extends JPanel implements Runnable{
    public DeepGraphViewer() {
        add(initAndShowGUI());
    }
    private static JFXPanel initAndShowGUI() {
        final JFXPanel fxPanel = new JFXPanel();
        Platform.runLater(new Runnable() {
            @Override
            public void run() {
                initFX(fxPanel);
            }
        });
        return fxPanel;
    }
    private static void initFX(JFXPanel fxPanel) {
        Scene scene = new Scene(new Browser(),900,600, Color.web("#666970"));
        fxPanel.setScene(scene);
    }
    public void run() {
    }
}


class Browser extends Region {
    private WebView browser = new WebView();
    private WebEngine webEngine = browser.getEngine();

    public class JavaApp{
        public String getData() {
            CommonData commonData = new CommonData();
            return commonData.str;
        }
        public void returnName(String name) {
            JSReturnName jsReturnName = new JSReturnName();
            jsReturnName.setValue(name);
            System.out.println(jsReturnName.namereturn);
//            ActionManager actionManager = ActionManager.getInstance();
//            AnAction action = actionManager.getAction("PluginTest.AutoMapping");
//            if (action == null) {
//                System.out.println("nonono");
//            }
//            AnActionEvent event = new AnActionEvent();
//            System.out.println(event.getPresentation().isEnabled());
//            action.actionPerformed(event);


            jsReturnName.addPropertyChangeListener(new PropertyChangeListener() {
                @Override
                public void propertyChange(PropertyChangeEvent evt) {
                }
            });

        }
    }
    public Browser() {
        CommonData commonData = new CommonData();
        commonData.str = commonData.changeStr(commonData.str);
        String scriptStr = "    var ModelDate = \"" + commonData.str + "\";TbDataToPrepareData(ModelDate);";
        webEngine.setJavaScriptEnabled(true);
        JavaApp javaApp = new JavaApp();

        webEngine.getLoadWorker().stateProperty().addListener(
                new ChangeListener<State>() {
                    @Override public void changed(ObservableValue ov, State oldState, State newState) {
                        if (newState == Worker.State.SUCCEEDED) {
                            JSObject win = (JSObject) webEngine.executeScript("window");
                            win.setMember("JavaAPI", javaApp);
                            webEngine.executeScript(scriptStr);
                        }
                        else if (newState == Worker.State.FAILED){
                            System.out.println(newState);
                        }
                    }
                });

        String str = DeepGraphViewer.class.getResource("../../view/dagrejsTest.html").toExternalForm();
        webEngine.load(str);
        getChildren().add(browser);
    }

    @Override protected void layoutChildren() {
        double w = getWidth();
        double h = getHeight();
        layoutInArea(browser,0,0,w,h,0, HPos.CENTER, VPos.CENTER);
    }

    @Override protected double computePrefWidth(double height) {
        return 900;
    }

    @Override protected double computePrefHeight(double width) {
        return 600;
    }
}


