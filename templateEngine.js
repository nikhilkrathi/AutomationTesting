module.exports = {
	getImportStatements: function () {
		return 'package reportGen;\n'+
				'import org.openqa.selenium.By;\n'+
				'import org.openqa.selenium.WebDriver;\n'+
				'import org.openqa.selenium.firefox.FirefoxDriver;\n'+
				'import org.testng.Assert;\n'+
				'import org.testng.annotations.AfterMethod;\n'+
				'import org.testng.annotations.BeforeMethod;\n'+
				'import org.testng.annotations.BeforeTest;\n'+
				'import org.testng.annotations.Test;\n\n';
	},
	
	getPreTestCode: function() {
		return 'public class NoReportClass {\n'+
				'WebDriver driver;\n\n'+
				'@BeforeTest\n'+
	 			'public void startReport(){\n'+
				'System.setProperty("webdriver.gecko.driver", "C:\\geckodriver\\geckodriver.exe");\n'+
	 			'}\n\n'+
	 			'@BeforeMethod\n'+
	 			'public void initiateDriver() {\n'+
				'driver = new FirefoxDriver();\n'+
	 			'}\n\n';
	},

	getStartTestCode: function(testNumber){
		return '@Test\n'+
				'public void test' + testNumber + '() {\n';
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
	},

	getEndTestCode: function(){
		return '}\n\n';
	},

	getPostTestCode: function() {
		return '@AfterMethod\n'+
				'public void endReport() {\n'+
	    		'driver.quit();\n'+
	 			'}\n'+
				'}\n';
	},	
};
