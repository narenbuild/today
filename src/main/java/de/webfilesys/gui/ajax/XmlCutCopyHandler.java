package de.webfilesys.gui.ajax;

import java.io.File;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Element;

import de.webfilesys.ClipBoard;
import de.webfilesys.util.XmlUtil;

/**
 * @author Frank Hoehnel
 */
public class XmlCutCopyHandler extends XmlRequestHandlerBase
{
	public XmlCutCopyHandler(
    		HttpServletRequest req, 
    		HttpServletResponse resp,
            HttpSession session,
            PrintWriter output, 
            String uid)
	{
        super(req, resp, session, output, uid);
	}
	
	protected void process()
	{
		if (!checkWriteAccess())
		{
			return;
		}
		
		String fileName = getParameter("fileName");

		String path = getCwd();
		
		if (path.endsWith(File.separator))
		{
			path = path + fileName;
		}
		else
		{
			path = path + File.separator + fileName;
		}

		if (!checkAccess(path))
		{
			return;
		}

		String cmd = getParameter("cmd");

		ClipBoard clipBoard = (ClipBoard) session.getAttribute("clipBoard");
		
		boolean clipBoardWasEmpty = ((clipBoard == null) || clipBoard.isEmpty());
		
        boolean wasMoveOperation = false;
		
		if (clipBoard != null)
		{
			wasMoveOperation = clipBoard.isMoveOperation();
			
			if ((!cmd.equals("addCopy")) && (!cmd.equals("addMove"))) {
				clipBoard.reset();
			}
		} else {
			clipBoard = new ClipBoard();
			session.setAttribute("clipBoard", clipBoard);
		}

		clipBoard.addFile(path);
		
		if (cmd.equals("copy"))
		{
			clipBoard.setCopyOperation();
		}
		else if (cmd.equals("move"))
		{
			clipBoard.setMoveOperation();
		}
		
		String resultMsg = null;
		
		if (cmd.equals("copy"))
		{	
			resultMsg = "1 " + getResource("alert.filescopied","files copied to clipboard");
		}
		else if (cmd.equals("addCopy"))
		{	
			resultMsg = "1 " + getResource("alert.filesAddedForCopy","files added for copy operation.")
			          + " " + clipBoard.keySet().size() + " " + getResource("alert.filesInClipboard","files are selected now.");
		}
		else if (cmd.equals("addMove"))
		{	
			resultMsg = "1 " + getResource("alert.filesAddedForMove","files added for move operation.")
			          + " " + clipBoard.keySet().size() + " " + getResource("alert.filesInClipboard","files are selected now.");
		}
		else if (cmd.equals("move"))
		{
			resultMsg = "1 " + getResource("alert.filesmoved","files moved to clipboard");
		}

		Element resultElement = doc.createElement("result");
		
		XmlUtil.setChildText(resultElement, "message", resultMsg);

		if (clipBoard.isCopyOperation()) {
			XmlUtil.setChildText(resultElement, "copyOperation", "true");
		}
		if (clipBoard.isMoveOperation()) {
			XmlUtil.setChildText(resultElement, "moveOperation", "true");
		}

		if (clipBoardWasEmpty) {
			XmlUtil.setChildText(resultElement, "enablePaste", "true");
		}

		if ((clipBoardWasEmpty || wasMoveOperation) && clipBoard.isCopyOperation()) {
			XmlUtil.setChildText(resultElement, "enablePasteAsLink", "true");
		}
		
		XmlUtil.setChildText(resultElement, "success", "true");
			
		doc.appendChild(resultElement);
		
		this.processResponse();
	}
}
