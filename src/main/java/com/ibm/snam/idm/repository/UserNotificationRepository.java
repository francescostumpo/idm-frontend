package com.ibm.snam.idm.repository;

import com.ibm.snam.idm.model.UserNotification;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserNotificationRepository extends CrudRepository<UserNotification, Integer> {

    public List<UserNotification> findByUserId(String userId);

}
