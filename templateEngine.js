module.exports = {
	getPreCode: function() {
		return 'public class T1 { \n' + 
			   'public static void main(String[] args) {\n' + 
			   'System.setProperty("webdriver.gecko.driver", "C:\\geckodriver\\geckodriver.exe");\n' +
			   'WebDriver driver = new FirefoxDriver();\n';
	},

	getPostCode: function() {
		return '}\n' + 
				'}\n';
	},

	getTemplateCode: function(row) {
		if(row.command == "open") {
			return 'driver.get("' + row.targetval + '");\n';
		}
		else if(row.command == "type") { 		
			return 'driver.findElement(By.' + row.target + '("' + row.targetval + '")).sendKeys("' + row.value + '");';
		}
		else if(row.command == "click") {
			return 'driver.findElement(By.' + row.target + '("' + row.targetval + '")).click();';
		}
	}	
};
