const CookiePolicyPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-12 px-8">
            <>
                <div className="max-w-5xl px-8 mx-auto sm:mt-10">
                    <h1 className="text-center text-3xl sm:text-6xl font-semibold text-gray-700 mb-2">
                        Cookie Policy
                    </h1>
                    <h2 className="text-center text-gray-600 mb-20">
                        Last updated {
                            new Date().toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })
                        }
                    </h2>
                    <h3 className="text-left text-2xl font-semibold text-gray-600 mb-5">
                        1. Introduction
                    </h3>
                    <p className="text-justify leading-relaxed text-gray-600 mt-5 mb-10">
                        By using Mailverra you confirm your acceptance of, and agree to be bound by, these cookie policy.
                    </p>
                    <h3 className="text-left text-2xl font-semibold text-gray-600 mb-5">
                        2. What Are Cookies
                    </h3>
                    <p className="text-justify leading-relaxed text-gray-600 mt-5 mb-10">
                        As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or break certain elements of the sites functionality.
                    </p>
                    <h3 className="text-left text-2xl font-semibold text-gray-600 mb-5">
                        3. How We Use Cookies
                    </h3>
                    <p className="text-justify leading-relaxed text-gray-600 mt-5 mb-10">
                        We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                    </p>
                    <h3 className="text-left text-2xl font-semibold text-gray-600 mb-5">
                        4. Disabling Cookies
                    </h3>
                    <p className="text-justify leading-relaxed text-gray-600 mt-5 mb-10">
                        You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
                    </p>
                    <h3 className="text-left text-2xl font-semibold text-gray-600 mb-5">
                        5. The Cookies We Set
                    </h3>
                    <p className="text-justify leading-relaxed text-gray-600 mt-5 mb-10">
                        If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.
                    </p>
                    <h3 className="text-left text-2xl font-semibold text-gray-600 mb-5">
                        6. Third Party Cookies
                    </h3>
                    <p className="text-justify leading-relaxed text-gray-600 mt-5 mb-10">
                        In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                    </p>
                    <h3 className="text-left text-2xl font-semibold text-gray-600 mb-5">
                        7. More Information
                    </h3>
                    <p className="text-justify leading-relaxed text-gray-600 mt-5 mb-10">
                        Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren&apos;t sure whether you need or not it &apos;s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
                    </p>
                </div>
            </>
        </div>
    );
};

export default CookiePolicyPage;