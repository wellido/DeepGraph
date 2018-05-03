
public class fileReadTest {
    StringBuffer buffer = new StringBuffer();
    BufferedReader bf = new BufferedReader(new FileReader("Z:\\Users\\caixl\\Desktop\\新建文本文档.txt"));
    String s = null;
    while((s =bf.readLine())!=null)

    {//使用readLine方法，一次读一行
        buffer.append(s.trim());
        // }
        String xml = buffer.toString();
    }
}
