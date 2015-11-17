package lv.javaguru.java3.core.database.mail;

import lv.javaguru.java3.core.database.CRUDOperationDAO;
import lv.javaguru.java3.core.domain.mail.Folder;
import lv.javaguru.java3.core.domain.mail.Message;
import lv.javaguru.java3.core.domain.user.User;

import java.util.List;

/**
 * Created by Andrew on 15.11.2015.
 */
public interface FolderDAO extends CRUDOperationDAO<Folder, Long> {
    List getByUser(long userId);
}