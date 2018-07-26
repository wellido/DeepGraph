package controller.project;
import java.util.*;

public class ReadCodes {
//    public static void main(String[] args) {
//        new ReadCodes().execute();
//    }
     public Map<String, int[]> execute(String s) {
        s = replaceComments(s);
        //Every line
        List<String> RowList = new ArrayList<String>();
        //Key word and position
        Map<String, int[]> KeyWordMaps = new HashMap<String, int[]>();
        String[] SplitStr = s.split("\n");
        for (String col : SplitStr) {
            RowList.add(col);
        }
        int len = RowList.size();
        //Function name and parameter
        Map<String, String[]> FunctionMap = new HashMap<String, String[]>();
        //Variable and function Scope
        Map<String, int[]> FunScopeMap = new HashMap<String, int[]>();
        Map<String, int[]> VarScopeMap = new HashMap<String, int[]>();
        //Function object
        Map<String, String[]> FunctionObjMap = new IdentityHashMap<String, String[]>();
        //Variable and value
        Map<String, String> VariableMap = new HashMap<String, String>();
        //Variable relationship
        Map<String, String[]> CurrentVarMap = new HashMap<String, String[]>();
        //Space num of every front of row
        int[] FrontSpaceNum = new int[len];


        for (int i = 0 ; i < len ; i++) {
            int SpaceNum = 0;
            int j = 0;
            int RowLen = SplitStr[i].length();
            while (j < RowLen) {
                if (SplitStr[i].charAt(j) == ' ') {
                    SpaceNum++;
                } else {
                    j++;
                    break;
                }
                j++;
            }
            FrontSpaceNum[i] = SpaceNum;
        }

        //  1  loop
        // find def
        // find variable
        for (int i = 0 ; i < len ; i++) {
            int FunctionIndex;
            int ApostropheNum = 0;
            int DoublequotesNum = 0;
            if ((FunctionIndex = SplitStr[i].indexOf("def ")) > -1) {
                if (FunctionIndex == 0 || SplitStr[i].charAt(FunctionIndex - 1) == ' ') {
                    char SaveChar;
                    int j = 0;
                    while (j < FunctionIndex) {
                        SaveChar = SplitStr[i].charAt(j);
                        if (SaveChar == '#') {
                            break;
                        } else if (SaveChar == '\'') {
                            ApostropheNum ++;
                        } else if (SaveChar == '\"') {
                            DoublequotesNum ++;
                        }
                        j++;
                    }
                    if (ApostropheNum % 2 == 0 && DoublequotesNum % 2 == 0) {
                        int LeftBracketsIndex = 0;
                        int FunctionNameIndex = FunctionIndex + 4;
                        FunctionIndex = FunctionIndex + 4;
                        while (SplitStr[i].charAt(FunctionNameIndex++) != '(') {}
                        LeftBracketsIndex = FunctionNameIndex;
                        String FunctionName = SplitStr[i].substring(FunctionIndex, FunctionNameIndex - 1).replace(" ","");
                        FunctionNameIndex = SplitStr[i].lastIndexOf(')');
                        String[] FunParameters = SplitStr[i].substring(LeftBracketsIndex, FunctionNameIndex).replace(" ", "").split(",");
                        for (int m = 0 ; m < FunParameters.length ; m++) {
                            int EqIndex = -1;
                            if ((EqIndex = FunParameters[m].indexOf('=')) > 0) {
                                FunParameters[m] = FunParameters[m].substring(0, EqIndex);
                            }
                        }
                        for (int row = i + 1 ; row < len ; row++) {
                            if (FrontSpaceNum[row] == FrontSpaceNum[i]) {
                                int[] ScopeArray = {i, row};
                                FunScopeMap.put(FunctionName, ScopeArray);
                                break;
                            }
                        }
                        FunctionMap.put(FunctionName, FunParameters);
                        continue;
                    } else {
                        continue;
                    }
                }
            }

            int j = 0;
            ApostropheNum = 0;
            DoublequotesNum = 0;
            int EqualIndex = 0;
            char SaveChar;
            int StringLen = SplitStr[i].length();
            while (j < StringLen) {
                SaveChar = SplitStr[i].charAt(j);
                if (SaveChar == '#') {
                    break;
                } else if (SaveChar == '\'') {
                    ApostropheNum ++;
                } else if (SaveChar == '\"') {
                    DoublequotesNum ++;
                } else if (SaveChar == '=') {
                    if (SplitStr[i].charAt(j - 1) == '!' || SplitStr[i].charAt(j - 1) == '=' || SplitStr[i].charAt(j + 1) == '=') {
                        j++;
                        continue;
                    }
                    if (ApostropheNum % 2 == 0 && DoublequotesNum % 2 == 0) {
                        EqualIndex = j;
                        break;
                    }
                }
                j++;
            }
            if (EqualIndex > 0) {
                String FirstHalfString = SplitStr[i].substring(0, EqualIndex);
                String SecondHalfString = SplitStr[i].substring(EqualIndex + 1, SplitStr[i].length());
                if (FirstHalfString.contains("\"") || FirstHalfString.contains("\'")) {
                    String[] VariableSave = SecondHalfString.split(",");
                    String[] ValueSave = FirstHalfString.replace(" ", "").split("\\+");
                    for (String var : VariableSave) {
                        CurrentVarMap.put(var.replace(" ",""), ValueSave);
                        for (int row = i ; row < len ; row++) {
                            if (FrontSpaceNum[row] < FrontSpaceNum[i]) {
                                int[] ScopeArray = {i, row};
                                VarScopeMap.put(var.replace(" ",""), ScopeArray);
                                break;
                            }
                        }
                    }
                } else {
                    String[] VariableSave = FirstHalfString.split(",");
                    String[] ValueSave = SecondHalfString.replace(" ", "").split("\\+");
                    for (String var : VariableSave) {
                        CurrentVarMap.put(var.replace(" ", ""), ValueSave);
                        for (int row = i ; row < len ; row++) {
                            if (FrontSpaceNum[row] < FrontSpaceNum[i]) {
                                int[] ScopeArray = {i, row};
                                VarScopeMap.put(var.replace(" ",""), ScopeArray);
                                break;
                            }
                        }
                    }
                }
            }
        }

//        for (String key : VarScopeMap.keySet()) {
//            System.out.println(key + ":" + VarScopeMap.get(key)[0] + " " + VarScopeMap.get(key)[1]);
////            System.out.println(s.substring(VarScopeMap.get(key)[0],VarScopeMap.get(key)[1]));
//        }

        //Find the variable like name = "value"
        Iterator<String> iterator = CurrentVarMap.keySet().iterator();
        while (iterator.hasNext()) {
            String key = iterator.next();
            String[] JudgeArray = CurrentVarMap.get(key);
            if (JudgeArray.length == 1 && ((JudgeArray[0].charAt(0) == '\"' && JudgeArray[0].charAt(JudgeArray[0].length() - 1) == '\"') || (JudgeArray[0].charAt(0) == '\'' && JudgeArray[0].charAt(JudgeArray[0].length() - 1) == '\''))) {
                VariableMap.put(key, JudgeArray[0]);
                iterator.remove();
            }
        }
        //Iterator to find the variable
        for (int iter = 0 ; iter < 2 ; iter++) {
            Iterator<String> iterator2 = CurrentVarMap.keySet().iterator();
            while (iterator2.hasNext()) {
                String key = iterator2.next();
                String[] JudgeArray = CurrentVarMap.get(key);
                String ValueString = "";
                int Flag = 0;
                for (int i = 0 ; i < JudgeArray.length ; i++) {
                    if ((JudgeArray[i].charAt(0) == '\"' && JudgeArray[i].charAt(JudgeArray[i].length() - 1) == '\"') || (JudgeArray[i].charAt(0) == '\'' && JudgeArray[i].charAt(JudgeArray[i].length() - 1) == '\'')) {
                        if (ValueString == "") {
                            ValueString += JudgeArray[i];
                        } else {
                            ValueString = ValueString.substring(0, ValueString.length() - 1) + JudgeArray[i].substring(1);
                        }
                    } else if (VariableMap.containsKey(JudgeArray[i])) {
                        if (ValueString == "") {
                            ValueString += VariableMap.get(JudgeArray[i]);
                        } else {
                            ValueString = ValueString.substring(0, ValueString.length() - 1) + VariableMap.get(JudgeArray[i]).substring(1);
                        }
                    } else if (!CurrentVarMap.containsKey(JudgeArray[i])) {
                        Flag = 1;
                    } else {
                        continue;
                    }
                }
                if (Flag == 1) {
                    iterator2.remove();
                    continue;
                } else {
                    if (ValueString != "") {
                        VariableMap.put(key, ValueString);
                        iterator2.remove();
                    }
                }
            }
        }

        //2 loop
        //Find function object
        for (int i = 0 ; i < len ; i++) {
            for (String key : FunctionMap.keySet()) {
                if (RowList.get(i).contains(key) && !RowList.get(i).contains("def ")) {
                    int FunctionObjIndex = RowList.get(i).indexOf(key);
                    FunctionObjIndex = RowList.get(i).indexOf('(', FunctionObjIndex + 1);
                    int FunctionNameIndex = RowList.get(i).lastIndexOf(')');
                    if (FunctionObjIndex == -1 || FunctionNameIndex == -1) {
                        continue;
                    }
                    String[] FunParameters = RowList.get(i).substring(FunctionObjIndex + 1, FunctionNameIndex).replace(" ", "").split(",");
                    for (int m = 0 ; m < FunParameters.length ; m++) {
                        int EqIndex = -1;
                        if ((EqIndex = FunParameters[m].indexOf('=')) > 0) {
                            FunParameters[m] = FunParameters[m].substring(0, EqIndex);
                        }
                    }
                    FunctionObjMap.put(new String(key), FunParameters);
                }
            }
        }

        //3 loop
        //tf.name_scope, tf.placeholder
        //eg: with tf.name_scope('input')
        //eg: x = tf.placeholder(tf.float32, [None, 784], name='x-input')
        String[] KeyWords = {"tf.name_scope"};
        String[] KeyWords2 = {"tf.placeholder"};
        for (int i = 0 ; i < len ; i++) {
            List<String> ParaName = new ArrayList<String>();
            int FindKey = -1;
            int FindKey2 = -1;
            for (int j = 0 ; j < KeyWords.length ; j++) {
                FindKey = RowList.get(i).indexOf(KeyWords[j]);
                if (FindKey > -1) {
                    break;
                }
            }
            for (int j = 0 ; j < KeyWords2.length ; j++) {
                FindKey2 = RowList.get(i).indexOf(KeyWords2[j]);
                if (FindKey2 > -1) {
                    break;
                }
            }

            if (FindKey > -1 || FindKey2 > -1) {
                String SaveName = "";
                int NameStart;
                int NameEnd;
                String KeyName;
                String[] KeyNameArray;

                if (FindKey > -1) {
                    NameStart = RowList.get(i).indexOf("(", FindKey + 1);
                    NameEnd = RowList.get(i).lastIndexOf(')');
                    if (NameStart == -1 || NameEnd == -1) {
                        continue;
                    }
                    KeyName = RowList.get(i).substring(NameStart + 1, NameEnd);
                    KeyNameArray = KeyName.replace(" ","").split("\\+");
                } else {
                    NameStart = RowList.get(i).indexOf("name", FindKey2 + 1);
                    NameEnd = RowList.get(i).lastIndexOf(')');
                    if (NameStart == -1 || NameEnd == -1) {
                        continue;
                    }
                    KeyName = RowList.get(i).substring(NameStart + 5, NameEnd);
                    KeyName = KeyName.replace("=", "");
                    KeyName = KeyName.replace(" ", "");
                    KeyNameArray = KeyName.replace(" ","").split("\\+");
                }

                for (int m = 0 ; m < KeyNameArray.length ; m++) {
                    if (KeyNameArray[m].contains("\"") || KeyNameArray[m].contains("\'")) {
                        if (SaveName == "") {
                            SaveName = KeyNameArray[m];
                        } else {
                            SaveName = SaveName.substring(0, SaveName.length() - 1) + KeyNameArray[m].substring(1);
                        }
                    } else if (VariableMap.containsKey(KeyNameArray[m])) {
                        if (i <= VarScopeMap.get(KeyNameArray[m])[1] && i >= VarScopeMap.get(KeyNameArray[m])[0]) {
                            if (SaveName == "") {
                                SaveName = VariableMap.get(KeyNameArray[m]);
                            } else {
                                SaveName = SaveName.substring(0, SaveName.length() - 1) + VariableMap.get(KeyNameArray[m].substring(1));
                            }
                        }
                    } else {
                        int ParameterPos = -1;
                        String ThisName = "";
                        for (String key : FunScopeMap.keySet()) {
                            if (i <= FunScopeMap.get(key)[1] && i >= FunScopeMap.get(key)[0]) {
                                String[] parameters = FunctionMap.get(key);
                                for (int k = 0 ; k < parameters.length ; k++) {
                                    if (parameters[k].equals(KeyName)) {
                                        ParameterPos = k;
                                        ThisName = key;
                                    }
                                }
                            }
                        }
                        for (String key : FunctionObjMap.keySet()) {
                            if (key.equals(ThisName)) {
                                ParaName.add(FunctionObjMap.get(key)[ParameterPos]);
                            }
                        }
                    }
                }
                if (SaveName != "") {
                    int RowStart;
                    int RowEnd;
                    if (i == 0) {
                        RowStart = 0;
                        RowEnd = RowStart + RowList.get(i).length();
                    } else {
                        RowStart = s.indexOf(RowList.get(i));
                        RowEnd = RowStart + RowList.get(i).length();
                    }
                    int[] Current = {RowStart, RowEnd};
                    KeyWordMaps.put(SaveName, Current);
                } else if (ParaName.size() > 0) {
                    int RowStart;
                    int RowEnd;
                    if (i == 0) {
                        RowStart = 0;
                        RowEnd = RowStart + RowList.get(i).length();
                    } else {
                        RowStart = s.indexOf(RowList.get(i));
                        RowEnd = RowStart + RowList.get(i).length();
                    }
                    int[] Current = {RowStart, RowEnd};
                    for (int k = 0 ; k < ParaName.size() ; k++) {
                        KeyWordMaps.put(ParaName.get(k), Current);
                    }
                }
            }
        }

//        for (String key : KeyWordMaps.keySet()) {
//            System.out.println(key + ":" + KeyWordMaps.get(key)[0] + " " + KeyWordMaps.get(key)[1]);
//        }




//        String test1 = "";
////        String reg = "\\<[^\\>]*\\>";
//        Pattern pattern = Pattern.compile("\"\"\"(.*?)\"\"\"");
//        Matcher matcher = pattern.matcher(s);
//        while (matcher.find()) {
//            System.out.println(matcher.group());
//        }
        //Print Function
//        for (String key : FunctionMap.keySet()) {
//            System.out.print(key + "  ");
//            for (int n = 0 ; n < FunctionMap.get(key).length ; n++) {
//                System.out.print(FunctionMap.get(key)[n] + " ");
//            }
//            System.out.println();
//        }
//        //Print FunObj
//        for (String key : FunctionObjMap.keySet()) {
//            System.out.print(key + "  ");
//            for (int n = 0 ; n < FunctionObjMap.get(key).length ; n++) {
//                System.out.print(FunctionObjMap.get(key)[n] + " ");
//            }
//            System.out.println();
//        }
//        //Print Scope
//        for (String key : FunScopeMap.keySet()) {
//            System.out.print(key + "  ");
//            for (int n = 0 ; n < FunScopeMap.get(key).length ; n++) {
//                System.out.print(FunScopeMap.get(key)[n] + " ");
//            }
//            System.out.println();
//        }
//        //Print variable
//        for (String key : VariableMap.keySet()) {
//            System.out.println(key + "  " + VariableMap.get(key));
//        }
         return KeyWordMaps;
    }

//    private Integer[] searchAllIndex(String source, String target) {
//            List<Integer> ResultList = new ArrayList<Integer>();
//            int a = source.indexOf(target);
//            while (a != -1) {
//                ResultList.add(a);
//                a = source.indexOf(target, a + 1);
//            }
//            Integer[] result = ResultList.toArray(new Integer[ResultList.size()]);
//            return result;
//        }


    private String replaceComments (String source) {
        int STATE_SCAN = 0;
        int STATE_IS_BLOCK_COMMENT_START1 = 1;
        int STATE_IS_BLOCK_COMMENT_START2 = 2;
        int STATE_IN_BLOCK_COMMENT = 3;
        int STATE_IN_LINE_COMMENT = 4;
        int STATE_IS_BLOCK_COMMENT_END1 = 5;
        int STATE_IS_BLOCK_COMMENT_END2 = 6;
        char CharArray[] = source.toCharArray();
        int len = CharArray.length;
        int ReadState = STATE_SCAN;
//        ArrayList SourceList = new ArrayList();
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0 ; i < len ; i++) {
            char NowChar = CharArray[i];
            if (ReadState == STATE_SCAN) {
                if (NowChar == '\"') {
                    ReadState = STATE_IS_BLOCK_COMMENT_START1;
                } else if (NowChar == '#') {
                    ReadState = STATE_IN_LINE_COMMENT;
                }
                stringBuilder.append(NowChar);
            } else if (ReadState == STATE_IS_BLOCK_COMMENT_START1) {
                if (NowChar == '\"') {
                    ReadState = STATE_IS_BLOCK_COMMENT_START2;
                } else {
                    ReadState = STATE_SCAN;
                }
                stringBuilder.append(NowChar);
            } else if (ReadState == STATE_IS_BLOCK_COMMENT_START2) {
                if (NowChar == '\"') {
                    ReadState = STATE_IN_BLOCK_COMMENT;
                } else {
                    ReadState = STATE_SCAN;
                }
                stringBuilder.append(NowChar);
            } else if (ReadState == STATE_IN_LINE_COMMENT) {
                if (NowChar == '\n') {
                    ReadState = STATE_SCAN;
                    stringBuilder.append(NowChar);
                } else {
                    stringBuilder.append('T');
                }
            } else if (ReadState == STATE_IN_BLOCK_COMMENT) {
                if (NowChar == '\"') {
                    ReadState = STATE_IS_BLOCK_COMMENT_END1;
                    stringBuilder.append(NowChar);
                } else {
                    stringBuilder.append('T');
                }
            } else if (ReadState == STATE_IS_BLOCK_COMMENT_END1) {
                if (NowChar == '\"') {
                    ReadState = STATE_IS_BLOCK_COMMENT_END2;
                    stringBuilder.append(NowChar);
                } else {
                    ReadState = STATE_IN_BLOCK_COMMENT;
                    stringBuilder.append('T');
                }
            } else if (ReadState == STATE_IS_BLOCK_COMMENT_END2) {
                if (NowChar == '\"') {
                    ReadState = STATE_SCAN;
                    stringBuilder.append(NowChar);
                } else {
                    ReadState = STATE_IN_BLOCK_COMMENT;
                    stringBuilder.append('T');
                }
            }
        }
        return stringBuilder.toString();
    }
}

