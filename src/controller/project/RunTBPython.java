package controller.project;
import com.intellij.execution.ExecutionException;
import com.intellij.execution.RunManagerEx;
import com.intellij.execution.RunnerAndConfigurationSettings;
import com.intellij.execution.process.*;
import com.intellij.execution.runners.ExecutionEnvironment;
import com.intellij.execution.runners.ExecutionEnvironmentBuilder;
import com.intellij.execution.configurations.GeneralCommandLine;
import com.intellij.execution.configurations.ParamsGroup;
import com.intellij.ide.plugins.PluginManager;
import com.intellij.openapi.extensions.PluginId;
import com.jetbrains.python.run.CommandLinePatcher;
import com.intellij.openapi.project.Project;
import com.intellij.execution.executors.DefaultRunExecutor;
import com.intellij.execution.configurations.RunProfileState;
import com.jetbrains.python.run.PythonCommandLineState;
import com.intellij.openapi.application.ApplicationManager;
import com.intellij.openapi.progress.ProgressIndicator;
import com.intellij.openapi.progress.util.ProgressIndicatorBase;
import com.intellij.openapi.util.Computable;
import org.jetbrains.annotations.NotNull;

import java.io.*;
import java.nio.file.Paths;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class RunTBPython {
    private ProgressIndicator progressIndicator = new ProgressIndicatorBase(true);
    private PythonCommandLineState commandLineState;
    private CommandLinePatcher commandLinePatcher;
//    private VirtualFile virtualFile;
    private static ExecutorService pool = Executors.newCachedThreadPool();
    private String backendNodesInfo;

    public String getPythonConfiguration(Project project) {
        RunnerAndConfigurationSettings configuration = RunManagerEx.getInstanceEx(project).getSelectedConfiguration();
        System.out.println(configuration);
        if (configuration == null) {
            System.out.println("no configuration found!");
        }
        DefaultRunExecutor executor = new DefaultRunExecutor();
        ExecutionEnvironmentBuilder builder = ExecutionEnvironmentBuilder.createOrNull(executor, configuration);
        if (builder == null) {
            System.out.println("no builder found!");
        }
        ExecutionEnvironment environment = builder.activeTarget().build();
        try {
            RunProfileState state = environment.getState();
            if (! (state instanceof PythonCommandLineState)) {
                System.out.println("state wrong!");
            }
            commandLineState = (PythonCommandLineState) state;
        } catch (com.intellij.execution.ExecutionException e1) {
            System.out.println("execution error!");
        }
//        System.out.println(commandLineState);
        String TbPythonPluginPath = PluginManager.getPlugin(PluginId.getId("com.wellido.plugin.id")).getPath().getAbsolutePath();
        String PythonPath = Paths.get(TbPythonPluginPath, "lib", "plugin_event_accumulator.py").toAbsolutePath().toString();
        commandLinePatcher = commandLine -> {
            ParamsGroup paramsGroup = commandLine.getParametersList().getParamsGroup(
                    PythonCommandLineState.GROUP_MODULE);
            if (paramsGroup == null || paramsGroup.getParameters().isEmpty()) {
                paramsGroup = commandLine.getParametersList().getParamsGroup(
                        PythonCommandLineState.GROUP_SCRIPT);
            }
            if (paramsGroup == null) {
                return;
            }
//            System.out.println(paramsGroup);
            paramsGroup.addParameterAt(0,PythonPath);
//            System.out.println(paramsGroup);
        };
        backendNodesInfo = resultDispay();
        return backendNodesInfo;
    }

    private CapturingProcessHandler startProcess() throws ExecutionException, IOException {
        final GeneralCommandLine commandLine =
                ApplicationManager.getApplication().runReadAction(
                        (Computable<GeneralCommandLine>) () ->
                                commandLineState.generateCommandLine(
                                        new CommandLinePatcher[]{commandLinePatcher}));

        final CapturingProcessHandler processHandler = new CapturingProcessHandler(commandLine);
        return processHandler;
    }
    @NotNull
    private String resultDispay() {
        String display = "";
        try {
            CapturingProcessHandler processHandler = startProcess();
            System.out.println(processHandler);
            ProcessOutput processOutput =
                    processHandler.runProcessWithProgressIndicator(progressIndicator);
            display = processOutput.getStdout();
            String stderr = processOutput.getStderr();
            if (stderr.length() > 0) {
                System.out.println(stderr);
            }
        } catch (ExecutionException | IOException ex) {
            System.out.println(ex);
        }
        return display;
    }
    @NotNull
    public static final String arrayToString(byte[] bytes) {
        StringBuffer buff = new StringBuffer();
        for (int i = 0; i < bytes.length; i++) {
            buff.append(bytes[i] + " ");
        }
        return buff.toString();
    }
}


