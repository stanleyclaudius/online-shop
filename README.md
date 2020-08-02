<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## Store Scenario

**Dev Store** is an online shop that inspire by real life store, where user can buy products at that shop, where this store is not fully manage by a website, but it's admin will be in charged to check user payment, then verified it, so its not fully website app without human in charged. This online shop website offers some functionality below:

- A complete authentication feature, include verification code, forget password, and many more.
- A normal cart and checkout functionality for user.
- A chance to review a product, when it's bought by a user and arrived.
- A subcribe to newsletter functionality, where user can get news that sent by admin.
- A user control panel, where user can manage account easily.
- An admin page to check user cart, verify payment, and make a payment done.
- A dashboard page for admin which store main information of the store.
- A discount feature that admin can give for user.
- A normal CRUD for product at admin page.
- A message functionality for user to get message about reviewing products and discount code.
- Many more.

## Understand Project Better

Let's make an example of 2 people consists of **A** & **B**, where **A** is **Admin**, and **B** is **User**. One day **B** want to buy a product at **Dev Store**, so **B** open up the website and choose item that **B** want to buy. After seeing product detail, **B** interested and  click **Add To Cart** that item. After that, **B** click the **Checkout** button, that take **B** to checkout page where **B** must fill up shipping information, and **Discount Voucher** if **B** has it. After filling everything up, than **B** click **Proceed** button, where **B** will got an email that contain several information about **B** order, and contains a **FAKE BANK ACCOUNT NUMBER** where tell **B** to transfer total ammount of **B** checkout list to that **FAKE BANK ACCOUNT NUMBER** within 2 days. Since **B** has click the **Proceed** button, than **B** will got a status of **B** payment at **Home Page**, that **B** can see his/her invoice that contains **B** checkout list, total ammount, and many more.

**A** as admin will check the **Admin Page** to verify **B** payment, only if **B** made a payment within 2 days, otherwise **A** will delete **B** checkout list. Let's say **B** has made a payment, then **A** as **Admin** will verify it by clicking **Verify** at **Order List** menu at **Admin Page**, and start deliver the item to **B** shipping information that **B** fill when checkout. After sending it to delivery courier, **A** will got a **Tracking ID** for the item, so **A** will update the **Tracking ID** to **B** **Status Page** by clicking **Post Receipt** at **Order List** menu at **Admin Page**, so **B** can track it. Let's say after several days, **B** item has arrived, and **A** as admin know it, so **A** will open up **Admin Page** and choose **Order List** menu, and click the **Done** button, to finish up **B** checkout, when **A** click **Done** button, then **B** will got a message at **Dev Store Website** that tell **B** to review his/her product that he/she bought, **B** will only got 1 chance to review that product.

**That's the simple story to understand better this project, if you interested, you can clone this project to dig deeper to better know this project.**

## Setup Guide After Clone

1. Open your clone result project at your code editor, than create a new file name **.env** at your root folder or in this project, the root folder is **online-shop**, if you don't change the folder name, than you can make a new file at that folder name **.env**.

2. After creating **.env** file, you can open **.env.example** file at your clone result project, then copy everything to the **.env** file that you created before.

3. After copying everything to your **.env** file, you should change value of your database setting, by changing **DB_CONNECTION**, **DB_HOST**, **DB_PORT**, **DB_DATABASE**, **DB_USERNAME**, and **DB_PASSWORD** value to your database configuration. At default state, the database configuration from your copy result from **.env.example** file, will assumed that you used **MySQL** database, if you use **MySQL** database, then you only need to change (at your **.env** file) **DB_DATABASE** value become your **DATABASE NAME FOR THIS PROJECT**, **DB_USERNAME** value become your **DATABASE USERNAME**, and **DB_PASSWORD** value become your **DATABASE PASSWORD**. If you use other database beside **MySQL**, then you should change every database configuration at **.env** file.

4. Note that .env file may not contain space as a value, e.g. DB_DATABASE=MY DATABASE, this will error because .env file may not contain space at value, if you wish to use space then you should use a quotation mark between the value for example DB_DATABASE="MY DATABASE".

5. Because this project include verification code when user register, so this project require your email username and password. I will assume your **.env** file has email configuration already, in this case you can choose whether you want to use **gmail** send mail feature or **mailtrap** feature. **Mailtrap** is a fake email service, that can send your message to other people email to **Mailtrap Email** without sending to real email.

6. As default, your **.env** file mail configuration will use **Mailtrap** service, let's say you want to use **Mailtrap** service, so the first step if you choose **Mailtrap** service is you should go to [mailtrap.io](https://mailtrap.io) then Sign Up account, after that you should login and then click **New Project** button at right side, then setting your project according to mailtrap instruction. After everything done, You will see an inboxes at that contain your project name that you create before. After that you will see **SMTP Settings** menu, then choose the Integrations to **Laravel**, then replace your email configuration at **.env** file become your configuration that you got at [mailtrap.io](https://mailtrap.io).


