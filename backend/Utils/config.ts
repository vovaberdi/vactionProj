// Configuration

class Config { 
    public port = 3001; 
    // mysql database
    public mySQLhost = "localhost";
    public mySQLUser = "root";
    public mySQLPassword = "12345678";
    public mySQLdb = "vication";
}

const config = new Config();
export default config