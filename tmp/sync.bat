@echo off
rem �]�w�ӷ��P�ؼХؿ�
set "SOURCE=C:\GDrive\www"
set "DEST=C:\GDrive\www\home"

echo.
echo  ======================================================
echo   ���}���N�q %SOURCE%
echo   �ƻs index.html �Ψ�����귽�� %DEST%
echo  ======================================================
echo.

rem �إߥؼХؿ� (�p�G���s�b)
if not exist "%DEST%" (
    echo [+] ���b�إߥؼи�Ƨ�: %DEST%
    mkdir "%DEST%"
)

rem �ƻs�ڥؿ��U���D�n�ɮ�
echo [+] ���b�ƻs�ڥؿ��ɮ�...
copy "%SOURCE%\index.html" "%DEST%\"
copy "%SOURCE%\favicon.ico" "%DEST%\"
copy "%SOURCE%\footer.html" "%DEST%\"

rem �ϥ� xcopy �ƻs��Ӹ�Ƨ��A/E �]�t�l�ؿ��A/I �N�ؼе�����Ƨ��A/Y �л\���ɤ�����
echo [+] ���b�ƻs css ��Ƨ�...
xcopy "%SOURCE%\css" "%DEST%\css\" /E /I /Y

echo [+] ���b�ƻs js ��Ƨ�...
xcopy "%SOURCE%\js" "%DEST%\js\" /E /I /Y

echo [+] ���b�ƻs images ��Ƨ�...
xcopy "%SOURCE%\images" "%DEST%\images\" /E /I /Y

echo.
echo  ======================================================
echo   �ƻs�@�~�����I
echo  ======================================================
echo.
pause