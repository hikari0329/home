@echo off
rem 設定來源與目標目錄
set "SOURCE=C:\GDrive\www"
set "DEST=C:\GDrive\www\home"

echo.
echo  ======================================================
echo   此腳本將從 %SOURCE%
echo   複製 index.html 及其相關資源到 %DEST%
echo  ======================================================
echo.

rem 建立目標目錄 (如果不存在)
if not exist "%DEST%" (
    echo [+] 正在建立目標資料夾: %DEST%
    mkdir "%DEST%"
)

rem 複製根目錄下的主要檔案
echo [+] 正在複製根目錄檔案...
copy "%SOURCE%\index.html" "%DEST%\"
copy "%SOURCE%\favicon.ico" "%DEST%\"
copy "%SOURCE%\footer.html" "%DEST%\"

rem 使用 xcopy 複製整個資料夾，/E 包含子目錄，/I 將目標視為資料夾，/Y 覆蓋舊檔不提示
echo [+] 正在複製 css 資料夾...
xcopy "%SOURCE%\css" "%DEST%\css\" /E /I /Y

echo [+] 正在複製 js 資料夾...
xcopy "%SOURCE%\js" "%DEST%\js\" /E /I /Y

echo [+] 正在複製 images 資料夾...
xcopy "%SOURCE%\images" "%DEST%\images\" /E /I /Y

echo.
echo  ======================================================
echo   複製作業完成！
echo  ======================================================
echo.
pause