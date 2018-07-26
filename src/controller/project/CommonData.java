package controller.project;


public class CommonData {
    public String changeStr(String str) {
        str = str.replace("\"", "\\\"");
        str = str.replace("\n", "\\n\" + \n\"");
        str = str.substring(0,str.length() - 14);
        return str;
    }
    public static String str;
}




