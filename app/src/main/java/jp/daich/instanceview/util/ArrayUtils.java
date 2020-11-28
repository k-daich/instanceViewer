package jp.daich.instanceview.util;

public class ArrayUtils {

    /**
     * Invalidate Constructor
     */
    private ArrayUtils() {
    }

    public static String toString(String[] array) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < array.length; i++) {
            sb.append("[" + i + 1 + " : " + array[i].toString() + "] ");
        }
        return StringUtils.isEmpty(sb.toString()) ? "Empty" : sb.toString();
    }

    public static boolean isEmpty(String[] array) {
        if (array == null) return true;

        for(String ele : array) {
            if (StringUtils.isEmpty(ele)) return true;
        }
        return false;
    }

}
