package com.ibm.snam.idm.controller;

import com.ibm.snam.idm.common.Constants;
import com.ibm.snam.idm.model.UserNotification;
import com.ibm.snam.idm.service.UserNotificationService;
import net.sf.json.JSONObject;
import org.apache.tomcat.util.bcel.Const;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.LinkedList;
import java.util.List;

@RestController
public class UserNotificationController {

    @Autowired
    UserNotificationService userNotificationService;

    private Logger logger = LoggerFactory.getLogger(UserNotificationController.class);

    @GetMapping(value = "/getUserNotification")
    public ResponseEntity<JSONObject> getUserNotification(@RequestParam("userId") String userId){
        logger.info("getUserNotification -- INIT -- userId : " + userId);
        JSONObject response = new JSONObject();
        List<UserNotification> userNotifications = new LinkedList<>();
        try{
            userNotifications = userNotificationService.getUserNotification(userId);
            response.put("status", Constants.HTTP_STATUS_OK);
        }catch (Exception e){
            e.printStackTrace();
            response.put("status", Constants.HTTP_STATUS_ERROR);
        }
        response.put("userNotifications", userNotifications);
        logger.info("getUserNotification -- END -- userId : " + userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/createNotification", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JSONObject> createNotification(@RequestBody JSONObject notification){
        logger.info("createNotification -- INIT --");
        JSONObject response = new JSONObject();
        try{
            UserNotification userNotification = userNotificationService.createNotification(notification);
            if(userNotification.getId() != null){
                response.put("status", Constants.HTTP_STATUS_OK);
                response.put("userNotification", userNotification);
            }
            else{
                response.put("status", Constants.HTTP_STATUS_ERROR );
            }
        }catch (Exception e){
            e.printStackTrace();
            response.put("status", Constants.HTTP_STATUS_ERROR );
        }
        return new ResponseEntity<JSONObject>(response, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteNotification")
    public ResponseEntity<JSONObject> deleteNotification(@RequestParam int idNotification, @RequestParam String idUser){
        logger.info("deleteNotification -- INIT -- user : " + idUser);
        JSONObject response = new JSONObject();
        try{
            logger.info("Eliminating notification with id " + idNotification);
            boolean success = userNotificationService.deleteNotification(idNotification);
            if(success) {
                response.put("status", Constants.HTTP_STATUS_OK);
                response.put("message", "OK");
            }
            else{
                response.put("status", Constants.HTTP_STATUS_ERROR );
                response.put("message", Constants.ERROR_DELETING_NOTIFICATION);
            }
        }catch (Exception e){
            e.printStackTrace();
            response.put("status", Constants.HTTP_STATUS_ERROR );
            response.put("message", Constants.ERROR_DELETING_NOTIFICATION);
        }
        return new ResponseEntity<JSONObject>(response, HttpStatus.OK);
    }
}
