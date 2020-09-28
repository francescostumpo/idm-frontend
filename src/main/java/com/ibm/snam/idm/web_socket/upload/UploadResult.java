package com.ibm.snam.idm.web_socket.upload;

public class UploadResult {
    private boolean failed;
    private String filename;

    public UploadResult(boolean failed, String filename) {
        this.failed = failed;
        this.filename = filename;
    }

    public boolean isFailed() {
        return failed;
    }

    public void setFailed(boolean failed) {
        this.failed = failed;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }
}
