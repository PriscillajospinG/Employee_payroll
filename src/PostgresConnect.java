import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class PostgresConnect {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/payrolldb";
        String user = "postgres"; // or your username
        String password = "hsjwj12+kq6Y"; // replace with your actual password

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            if (conn != null) {
                System.out.println("Connected to the database!");
            }
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }
}