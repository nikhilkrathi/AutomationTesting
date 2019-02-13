public class T1 {
  public static void main(String[] args) {
    System.setProperty("webdriver.gecko.driver", "C:\geckodriver\geckodriver.exe");
    WebDriver driver = new FirefoxDriver();
    driver.get("http://localhost/twitter");
    driver.findElement(By.name("email")).sendKeys("nikhilkrathi@gmail.com");
    driver.findElement(By.name("password")).sendKeys("123456");
    driver.findElement(By.name("login")).click();
  }
}