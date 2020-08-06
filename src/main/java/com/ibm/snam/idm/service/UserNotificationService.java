package com.ibm.snam.idm.service;

import com.ibm.snam.idm.model.UserNotification;
import com.ibm.snam.idm.repository.UserNotificationRepository;
import com.ibm.snam.idm.util.Util;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.Notification;
import java.time.LocalDate;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Service
public class UserNotificationService {

    @Autowired
    UserNotificationRepository userNotificationRepository;

    Logger logger = LoggerFactory.getLogger(UserNotificationService.class);

    public UserNotification createNotification(JSONObject notification){
        logger.info("createNotification -- INIT -- notification : " + notification);
        UserNotification userNotification = new UserNotification();
        try {
            String userId = notification.getString("userId");
            userNotification.setUserId(userId);
            LocalDate now  = LocalDate.now();
            logger.info("Create notification for user " + userId + " at time : " + now.toString());
            userNotification.setCreationDate(Util.getNow());
            userNotification.setCig(notification.getString("cig"));
            userNotification.setNotificationType(notification.getString("notificationType"));
            if (notification.has("idTender")) {
                userNotification.setIdTender(notification.getString("idTender"));
            }
            if (notification.has("idSupplier")) {
                userNotification.setIdSupplier(notification.getString("idTender"));
            }
            logger.info("Saving notification : " + userNotification);
            userNotificationRepository.save(userNotification);
        }catch (Exception e){
            e.printStackTrace();
            logger.error("Error in createNotification");
        }
        logger.info("createNotification -- END -- ");
        return userNotification;
    }

    public List<UserNotification> getUserNotification(String userId){
        logger.info("getUserNotification -- INIT --");
        List<UserNotification> userNotificationList = new LinkedList<>();
        try{
            userNotificationList = userNotificationRepository.findByUserId(userId);
            logger.info("Found " + userNotificationList.size() + " notification(s) for user " + userId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return userNotificationList;
    }

    public void deleteNotification(JSONObject notification){
        logger.info("deleteNotification -- INIT -- notification : " + notification);
        try {
            int id = notification.getInt("id");
            userNotificationRepository.deleteById(id);
            logger.info("deleteNotification -- END --");
        }catch (Exception e){
            e.printStackTrace();
            logger.error("Error in deleteNotification");
        }
    }

}
