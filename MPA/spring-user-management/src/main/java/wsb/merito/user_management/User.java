package wsb.merito.user_management;

// src/main/java/com/example/usermanagement/User.java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data; // Lombok!

@Data // Automatycznie generuje gettery, settery, toString(), equals(), hashCode()
@Entity
@Table(name = "app_users") // Lepiej nie nazywać tabeli "user", to słowo kluczowe w SQL
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
}