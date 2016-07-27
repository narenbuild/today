<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">	
<xsl:output method="html" indent="yes" omit-xml-declaration="yes" encoding="UTF-8" 
    doctype-public="html" />

<xsl:strip-space elements="bookmarkList bookmark" />

<xsl:include href="util.xsl" />

<!-- root node-->
<xsl:template match="/">

<html>
<head>

  <meta http-equiv="expires" content="0" />

  <link rel="stylesheet" type="text/css" href="/webfilesys/styles/common.css" />

  <link rel="stylesheet" type="text/css">
    <xsl:attribute name="href">/webfilesys/styles/skins/<xsl:value-of select="/bookmarkList/css" />.css</xsl:attribute>
  </link>

  <script src="/webfilesys/javascript/browserCheck.js" type="text/javascript"></script>
  <script src="/webfilesys/javascript/ajaxCommon.js" type="text/javascript"></script>
  <script src="/webfilesys/javascript/ajaxFolder.js" type="text/javascript"></script>
  <script src="/webfilesys/javascript/util.js" type="text/javascript"></script>

  <script src="/webfilesys/javascript/resourceBundle.js" type="text/javascript"></script>
  <script type="text/javascript">
    <xsl:attribute name="src">/webfilesys/servlet?command=getResourceBundle&amp;lang=<xsl:value-of select="/bookmarkList/language" /></xsl:attribute>
  </script>

</head>

<body>

<xsl:apply-templates />

</body>

  <script type="text/javascript">
    setBundleResources();
  </script>

</html>

</xsl:template>
<!-- end root node-->

<xsl:template match="bookmarkList">

  <div class="headline" resource="label.bookmarks" />

  <form accept-charset="utf-8" name="bookmarkForm" method="get" action="/webfilesys/servlet">
    <input type="hidden" name="command" value="exp" />
    <input type="hidden" name="expandPath">
      <xsl:attribute name="value"><xsl:value-of select="currentPath" /></xsl:attribute>
    </input>

    <xsl:if test="bookmark">

      <table border="0" cellpadding="2" cellspacing="0">

        <xsl:for-each select="bookmark">
        
          <xsl:variable name="pathForScript"><xsl:call-template name="insDoubleBackslash"><xsl:with-param name="string"><xsl:value-of select="encodedPath" /></xsl:with-param></xsl:call-template></xsl:variable>
        
          <tr>
            <td>
              <img border="0">
                <xsl:if test="icon">
                  <xsl:attribute name="src">/webfilesys/icons/<xsl:value-of select="icon" /></xsl:attribute>
                </xsl:if>
                <xsl:if test="not(icon)">
                  <xsl:attribute name="src">/webfilesys/images/bookmark.gif</xsl:attribute>
                </xsl:if>
              </img>
            </td>
          
            <td>
              <a class="dirtree">
                <xsl:if test="textColor">
                  <xsl:attribute name="style">color:<xsl:value-of select="textColor" /></xsl:attribute>
                </xsl:if>
                <xsl:if test="/bookmarkList/mobile">
                  <xsl:attribute name="href">javascript:gotoBookmarkedFolder('<xsl:value-of select="$pathForScript" />', true)</xsl:attribute>
                </xsl:if>
                <xsl:if test="not(/bookmarkList/mobile)">
                  <xsl:attribute name="href">javascript:gotoBookmarkedFolder('<xsl:value-of select="$pathForScript" />', false)</xsl:attribute>
                </xsl:if>
                <xsl:attribute name="title"><xsl:value-of select="path" /></xsl:attribute>
    
                <xsl:value-of select="name" />
              </a>
            </td>
            
            <xsl:if test="not(/bookmarkList/readonly)">
              <td style="width:30px;">&#160;</td>
              
              <td>
                <a titleResource="label.deleteBookmark">
                  <xsl:attribute name="href">/webfilesys/servlet?command=bookmarks&amp;cmd=delete&amp;id=<xsl:value-of select="@id" /></xsl:attribute>
                  <img src="/webfilesys/images/trash.gif" border="0" />
                </a>
              </td>
            </xsl:if>
            
          </tr>
        </xsl:for-each>
      
      </table>
    
    </xsl:if>
    
    <xsl:if test="not(bookmark)">
      <br/>
      <span resource="label.noBookmarksDefined"></span>
      <br/>
    </xsl:if>

    <br/>
    
    <a class="button" onclick="this.blur()"> 
      <xsl:if test="/bookmarkList/mobile">
        <xsl:attribute name="href">/webfilesys/servlet?command=mobile&amp;cmd=folderFileList</xsl:attribute>
      </xsl:if>
      <xsl:if test="not(/bookmarkList/mobile)">
        <xsl:attribute name="href">javascript:document.bookmarkForm.submit()</xsl:attribute>
      </xsl:if>
      <span resource="button.return"></span>
    </a>              

  </form>
  
</xsl:template>

</xsl:stylesheet>