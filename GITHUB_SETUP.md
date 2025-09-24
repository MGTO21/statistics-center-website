# تعليمات رفع الموقع على GitHub

## الخطوات المطلوبة:

### 1. إنشاء Repository على GitHub:
1. اذهب إلى [GitHub.com](https://github.com)
2. اضغط على زر "New" أو "+" في الأعلى
3. اختر "New repository"
4. أدخل اسم المشروع: `statistics-center-website`
5. اختر "Public" لجعله مرئياً للجميع
6. **لا تضع علامة** على "Add a README file"
7. اضغط "Create repository"

### 2. ربط المشروع المحلي بـ GitHub:
بعد إنشاء Repository، ستحصل على رابط مثل:
`https://github.com/username/statistics-center-website.git`

قم بتشغيل الأوامر التالية (استبدل `username` باسم المستخدم الخاص بك):

```bash
git remote add origin https://github.com/username/statistics-center-website.git
git push -u origin main
```

### 3. تفعيل GitHub Pages:
1. اذهب إلى صفحة Repository على GitHub
2. اضغط على "Settings" في الأعلى
3. في القائمة الجانبية، اضغط على "Pages"
4. في قسم "Source"، اختر "Deploy from a branch"
5. اختر "main" branch و "/ (root)" folder
6. اضغط "Save"

### 4. الحصول على رابط الموقع:
بعد بضع دقائق، ستحصل على رابط الموقع:
`https://username.github.io/statistics-center-website`

## ملاحظات مهمة:
- تأكد من أن Repository عام (Public) ليعمل GitHub Pages
- قد يستغرق نشر الموقع من 5-10 دقائق
- يمكنك تحديث الموقع بإضافة الملفات وcommit وpush

## الملفات المرفوعة:
- `index.html` - الصفحة الرئيسية
- `styles.css` - ملف التصميم
- `script.js` - ملف JavaScript
- `README.md` - وصف المشروع
- `public/` - مجلد الصور والأيقونات
- `services/` - صفحات الخدمات

## المميزات:
✅ تصميم متجاوب  
✅ وضع فاتح وداكن  
✅ تأثيرات بصرية متقدمة  
✅ قابلية الوصول  
✅ أداء عالي  
