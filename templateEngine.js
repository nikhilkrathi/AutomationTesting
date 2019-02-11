module.exports = {
	beforeString: function() {
		return 'public class T1 { \n' + 
				'public static void main(String[] args) {\n' + 
				'System.setProperty("webdriver.gecko.driver", "C:\\geckodriver\\geckodriver.exe");\n' +
				'WebDriver driver = new FirefoxDriver();\n';
	},

	afterString: function() {
		return '}\n' + 
				'}\n';
	},

	templateString: function(row) {
		if(row.command == "open"){
			return 'driver.get("' + row.targetval + '");';
		}
	}	
};
