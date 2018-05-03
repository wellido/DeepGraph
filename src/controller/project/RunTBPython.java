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
import com.intellij.openapi.vfs.LocalFileSystem;
import com.jetbrains.python.run.CommandLinePatcher;
import com.intellij.openapi.project.Project;
import com.intellij.execution.executors.DefaultRunExecutor;
import com.intellij.execution.configurations.RunProfileState;
import com.jetbrains.python.run.PythonCommandLineState;
import com.intellij.openapi.application.ApplicationManager;
import com.intellij.openapi.fileEditor.FileDocumentManager;
import com.intellij.openapi.editor.Document;
import com.intellij.openapi.progress.ProgressIndicator;
import com.intellij.openapi.progress.util.ProgressIndicatorBase;
import com.intellij.openapi.util.Computable;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.NotNull;

import java.io.*;
import java.nio.file.Paths;
import java.util.*;

public class RunTBPython {
    private ProgressIndicator progressIndicator = new ProgressIndicatorBase(true);
    private PythonCommandLineState commandLineState;
    private CommandLinePatcher commandLinePatcher;
    private VirtualFile virtualFile;

    public boolean getPythonConfiguration(Project project) {
        RunnerAndConfigurationSettings configuration = RunManagerEx.getInstanceEx(project).getSelectedConfiguration();
        System.out.println(configuration);
        if (configuration == null) {
            System.out.println("no configuration found!");
            return false;
        }
        DefaultRunExecutor executor = new DefaultRunExecutor();
        ExecutionEnvironmentBuilder builder = ExecutionEnvironmentBuilder.createOrNull(executor, configuration);
        if (builder == null) {
            System.out.println("no builder found!");
            return false;
        }
        ExecutionEnvironment environment = builder.activeTarget().build();
        try {
            RunProfileState state = environment.getState();
            if (! (state instanceof PythonCommandLineState)) {
                System.out.println("state wrong!");
                return false;
            }
            commandLineState = (PythonCommandLineState) state;
        } catch (com.intellij.execution.ExecutionException e1) {
            System.out.println("execution error!");
            return false;
        }
        String TbPythonPluginPath = PluginManager.getPlugin(PluginId.getId("com.wellido.plugin.id")).getPath().getAbsolutePath();
        String PythonPath = Paths.get(TbPythonPluginPath, "lib", "JPTest.py").toAbsolutePath().toString();
        commandLinePatcher = commandLine -> {
            Map<String, String> environment1 = commandLine.getEnvironment();
            ParamsGroup paramsGroup = commandLine.getParametersList().getParamsGroup(
                    PythonCommandLineState.GROUP_MODULE);
            if (paramsGroup == null || paramsGroup.getParameters().isEmpty()) {
                paramsGroup = commandLine.getParametersList().getParamsGroup(
                        PythonCommandLineState.GROUP_SCRIPT);
            }
            if (paramsGroup == null) {
                return;
            }
//            String driverPath = paramsGroup.getParametersList().get(0);
//            paramsGroup.addParameter(PythonPath);
//            environment1.put("PYTHONPATH", PythonPath);
//            int i = 0;
//            paramsGroup.addParameterAt(i++, "-m");
//            paramsGroup.addParameterAt(i++, "code_tracer");
//            paramsGroup.addParameterAt(i++, "--filename");
//            paramsGroup.addParameterAt(i++, PythonPath);
        };
        File IOPythonFIle = new File(PythonPath);
        virtualFile = LocalFileSystem.getInstance().refreshAndFindFileByIoFile(IOPythonFIle);
        Document document = FileDocumentManager.getInstance().getDocument(virtualFile);
        String SourceCode = document.getText();
        resultDispay(SourceCode);
        return true;
    }

    private CapturingProcessHandler startProcess(String sourceCode) throws ExecutionException, IOException {
        final GeneralCommandLine commandLine =
                ApplicationManager.getApplication().runReadAction(
                        (Computable<GeneralCommandLine>) () ->
                                commandLineState.generateCommandLine(
                                        new CommandLinePatcher[]{commandLinePatcher}));
        final CapturingProcessHandler processHandler = new CapturingProcessHandler(commandLine);
        byte[] SourceCodeByte = null;
        try
        {
            SourceCodeByte = sourceCode.getBytes("GBK");
        }
        catch (java.io.UnsupportedEncodingException e)
        {
            e.printStackTrace();
        }
        String ByteString = arrayToString(SourceCodeByte);
        System.out.println(ByteString);
        try {
            final OutputStream processInput = processHandler.getProcessInput();
            assert processInput != null;
            processInput.write(SourceCodeByte);
            processInput.close();
            return processHandler;
        } catch (IOException e) {
            processHandler.destroyProcess();
            throw e;
        }
    }
    public static final String arrayToString(byte[] bytes) {
        StringBuffer buff = new StringBuffer();
        for (int i = 0; i < bytes.length; i++) {
            buff.append(bytes[i] + " ");
        }
        return buff.toString();
    }
    @NotNull
    private String resultDispay(String sourceCode) {
        String display = "";
        try {
            System.out.println("AAAAAA");
            CapturingProcessHandler processHandler = startProcess(sourceCode);
            System.out.println("BBBBBBBB");
            ProcessOutput processOutput =
                    processHandler.runProcessWithProgressIndicator(progressIndicator);
            display = processOutput.getStdout();
        } catch (ExecutionException | IOException ex) {
            System.out.println(ex);
        }
        System.out.println("CCCCC");
        System.out.println(display);
        System.out.println("DDDDD");
        return display;
    }

}


