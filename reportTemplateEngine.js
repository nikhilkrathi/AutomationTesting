module.exports = {
	getImportStatements: function () {
		return 'package reportGen;\n'+
				'import java.io.File;\n\n'+
				'import org.openqa.selenium.By;\n'+
				'import org.openqa.selenium.WebDriver;\n'+
				'import org.openqa.selenium.firefox.FirefoxDriver;\n'+
				'import org.testng.Assert;\n'+
				'import org.testng.ITestResult;\n'+
				'import org.testng.annotations.AfterMethod;\n'+
				'import org.testng.annotations.AfterTest;\n'+
				'import org.testng.annotations.BeforeMethod;\n'+
				'import org.testng.annotations.BeforeTest;\n'+
				'import org.testng.annotations.Test;\n\n'+
				'import com.relevantcodes.extentreports.ExtentReports;\n'+
				'import com.relevantcodes.extentreports.ExtentTest;\n'+
				'import com.relevantcodes.extentreports.LogStatus;\n\n';
	},
	
	getPreTestCode: function() {
		return 'public class ExtentReportClass {\n'+
				'ExtentReports extent;\n'+
				'ExtentTest logger;\n'+
				'WebDriver driver;\n\n'+
				'@BeforeTest\n'+
	 			'public void startReport(){\n'+
	 			'extent = new ExtentReports (System.getProperty("user.dir") +"/test-output/STMExtentReport.html", true);\n'+
				'extent.addSystemInfo("Host Name", "FinIQReports");\n'+
			    'extent.addSystemInfo("Environment", "Automation Testing");\n'+
			    'extent.addSystemInfo("User Name", "Peppz");\n'+
				'extent.loadConfig(new File(System.getProperty("user.dir")+"\\\\extent-config.xml"));\n'+	
				'System.setProperty("webdriver.gecko.driver", "C:\\\\geckodriver\\\\geckodriver.exe");\n'+
	 			'}\n\n'+
	 			'@BeforeMethod\n'+
	 			'public void initiateDriver() {\n'+
				'driver = new FirefoxDriver();\n'+
	 			'}\n\n';
	},

	getStartTestCode: function(testNumber){
		return '@Test\n'+
				'public void test' + testNumber + '() {\n'+
				'logger = extent.startTest("test' + testNumber + '");\n';
	},

	getTestCode: function(row) {
		if(row.command == "open") {
			return 'driver.get("' + row.targetval + '");\n';
		}
		else if(row.command == "type") { 		
			return 'driver.findElement(By.' + row.target + '("' + row.targetval + '")).sendKeys("' + row.value + '");\n';
		}
		else if(row.command == "click") {
			return 'driver.findElement(By.' + row.target + '("' + row.targetval + '")).click();\n';
		}
		else if(row.command == "assertText"){
			if(row.target == "url"){
				return 'if(driver.getCurrentUrl().equals("' + row.value + '")) {\n'+
						'logger.log(LogStatus.PASS, "Test Case Passed is loginTest");\n'+
						'} else {\n'+
						'Assert.assertTrue(false);\n'+
						'}\n';
			}
		}
	},

	getEndTestCode: function(){
		return '}\n\n';
	},

	getPostTestCode: function() {
		return '@AfterMethod\n'+
				'public void getResult(ITestResult result) {\n'+
	    		'if(result.getStatus() == ITestResult.FAILURE){\n'+
				'logger.log(LogStatus.FAIL, "Test Case Failed is "+result.getName());\n'+
				'logger.log(LogStatus.FAIL, "Test Case Failed is "+result.getThrowable());\n'+
			 	'} else if(result.getStatus() == ITestResult.SKIP){\n'+
				'logger.log(LogStatus.SKIP, "Test Case Skipped is "+result.getName());\n'+
			 	'}\n'+
			 	'extent.endTest(logger);\n'+
			 	'driver.quit();\n'+
		 		'}\n\n'+
		 		'@AfterTest\n'+
				'public void endReport() {\n'+
				'extent.flush();\n'+
				'extent.close();\n'+
	 			'}\n'+
				'}\n\n';
	},	
};
