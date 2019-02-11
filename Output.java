public class T1 {
  public static void main(String[] args) {
    System.setProperty("webdriver.gecko.driver", "C:\geckodriver\geckodriver.exe");
    WebDriver driver = new FirefoxDriver();
    driver.get("http://localhost/twitter");
    driver.get("http://khandulandu.com");
  }
}