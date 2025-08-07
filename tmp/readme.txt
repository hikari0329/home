這個 index.html 檔案是一個作品集的首頁，其目的是展示不同的專案。它引用了多種類型的本機檔案資源，這些資源是讓網頁正常顯示與運作所必需的。

根據 index.html 的程式碼，它所關聯的本地資源可分為以下幾類：

CSS 樣式表檔案 (位於 css 資料夾):

main.css

bootstrap.min.css

grid.css

JavaScript 腳本檔案 (位於 js 資料夾):

jquery.min.js

modernizr.custom.js

classie.js

jquery.lazyload.js

jquery.filterizr.js

controls.js

login.js

圖片檔案 (位於 images 資料夾):

favicon.ico (位於根目錄)

bg_logo_footer1.png

google_login1.png

易經占卦.png

紫微斗數.png

Cat_Logo.png

口罩地圖.jpg

HTML 頁尾檔案 (位於根目錄):

footer.html (透過 JavaScript 的 load 函數載入)

注意:
檔案中引用了一個路徑為 ../ws/images/ws_title0.gif 的圖片。這個路徑 (../) 代表上層目錄，表示該圖片不在 C:\GDrive\www 資料夾內，而在 C:\GDrive\ws\images。以下的 BAT 指令碼只會複製 C:\GDrive\www 目錄內的相關檔案。

BAT 批次檔
以下是一個 Windows 批次檔 (.bat)，它會將 index.html 以及上述分析出的所有相關資源從 C:\GDrive\www 複製到新的 C:\GDrive\www\home 資料夾中。

使用方法:

將下面的程式碼另存為一個檔案，例如 copy_files.bat。

將此檔案放在任何地方。

直接執行此檔案即可。