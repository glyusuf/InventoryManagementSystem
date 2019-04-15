package org.inventory.com.repository;
 
import java.util.Optional;

import org.inventory.com.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	Optional<User> findById(Long userId);

}
