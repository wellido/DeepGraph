package controller.project;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

public class JSReturnName {
    public static String namereturn;
    PropertyChangeSupport listeners = new PropertyChangeSupport(this);

    public JSReturnName() {
        namereturn = "";
    }
    public String getDemoName() {
        return namereturn;
    }
    public String getValue() {
        return this.namereturn;
    }
    public void setValue(String newValue) {
        String oldValue = this.namereturn;
        this.namereturn = newValue;
        firePropertyChange("value", oldValue, newValue);
    }
    public void addPropertyChangeListener(PropertyChangeListener listener) {
        listeners.addPropertyChangeListener(listener);
    }

    public void removePropertyChangeListener(PropertyChangeListener listener){
        listeners.addPropertyChangeListener(listener);
    }

    protected void firePropertyChange(String prop, Object oldValue, Object newValue) {
        listeners.firePropertyChange(prop, oldValue, newValue);
    }

}
