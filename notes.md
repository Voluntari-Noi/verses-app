$ git clone git@github.com:Voluntari-Noi/verses-app.git versete-de-memorat

$ cd versete-de-memorat

$ vim index.html

Replace GA Placeholder with GA script

TODO: On deploy add Google Analytics script (make sure latest version is used). Replace GA Placeholder.

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-172115546-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag( 'config', 'UA-172115546-1' );
</script>
FTP connect with FileZilla

Delete existing contents of versete-de-memorat folder on server.

Create new directory applicatii/versete-de-memorat

Copy all files from new version. (without .git folder)
