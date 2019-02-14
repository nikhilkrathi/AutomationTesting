package reportGen;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class NoReportClass {
  WebDriver driver;

  @BeforeTest
  public void startReport() {
    System.setProperty("webdriver.gecko.driver", "C:\\geckodriver\\geckodriver.exe");
  }

  @BeforeMethod
  public void initiateDriver() {
    driver = new FirefoxDriver();
  }

  @Test
  public void test2() {
    driver.get("http://localhost/twitter");
    driver.findElement(By.name("email")).sendKeys("nikhilkrathi@gmail.com");
    driver.findElement(By.name("password")).sendKeys("123456");
    driver.findElement(By.name("login")).click();
    Assert.assertEquals(driver.getCurrentUrl(), "http://localhost/twitter/home.php");
  }

  @Test
  public void test1() {
    driver.get("http://localhost/twitter");
    driver.findElement(By.name("email")).sendKeys("nikhilkrathi@gmail.com");
    driver.findElement(By.name("password")).sendKeys("123456");
    driver.findElement(By.name("login")).click();
    Assert.assertEquals(driver.getCurrentUrl(), "http://localhost/twitter/home.php");
  }

  @AfterMethod
  public void endReport() {
    driver.quit();
  }
}