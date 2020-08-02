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
- An admin page to check user cart, verify payment, and make a payment done.
- A dashboard page for admin which store main information of the store.
- A discount feature that admin can give for user.
- A normal CRUD for product at admin page.
- A message functionality for user to get message about reviewing products and discount code.
- Many more.

## Understand Project Better

Let's make an example of 2 people consistts of **A** & **B**, where **A** is **Admin**, and **B** is **User**. One day **B** want to buy a product at **Dev Store**, so **B** open up the website and choose item that **B** want to buy. After seeing product detail, **B** interseted and  click **Add To Cart** that item. After that, **B** click the **Checkout** button, that take **B** to checkout page where **B** must fill up shipping information, and **Discount Voucher** if **B** has it. After filling everything up, than **B** click **Proceed** button, where **B** will got an email that contain several information about **B** order, and contains a **FAKE BANK ACCOUNT NUMBER** where tell **B** to transfer money to that **FAKE BANK ACCOUNT NUMBER** within 2 days. Since **B** has click the **Proceed** button, than **B** will got a status of **B** payment at **Home Page**, that **B** can see his/her invoice that contains **B** checkout list, total ammount, and many more.

**A** as admin will check the **Admin Page** to verify **B** payment, only if **B** made a payment within 2 days, otherwise **A** will delete **B** checkout list.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- [UserInsights](https://userinsights.com)
- [Fragrantica](https://www.fragrantica.com)
- [SOFTonSOFA](https://softonsofa.com/)
- [User10](https://user10.com)
- [Soumettre.fr](https://soumettre.fr/)
- [CodeBrisk](https://codebrisk.com)
- [1Forge](https://1forge.com)
- [TECPRESSO](https://tecpresso.co.jp/)
- [Runtime Converter](http://runtimeconverter.com/)
- [WebL'Agence](https://weblagence.com/)
- [Invoice Ninja](https://www.invoiceninja.com)
- [iMi digital](https://www.imi-digital.de/)
- [Earthlink](https://www.earthlink.ro/)
- [Steadfast Collective](https://steadfastcollective.com/)
- [We Are The Robots Inc.](https://watr.mx/)
- [Understand.io](https://www.understand.io/)
- [Abdel Elrafa](https://abdelelrafa.com)
- [Hyper Host](https://hyper.host)
- [Appoly](https://www.appoly.co.uk)
- [OP.GG](https://op.gg)
- [云软科技](http://www.yunruan.ltd/)

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
