
(function () {

    "use strict";

    module.exports = {
        applicationMessage: {
            alreadyExists : "Database with same name already exists",
            serverError: "OOPS!!! Something went wrong with the server.",
            noContent: "File content cannot be retrieved",
            dbRestoreFail: "Database not restored. It may be because of invalid backup file format or wrong backup configuration. Please check the configuration in database.config.js inside of lib/configs folder",
            dbRestoreError: "Error Occurs while restroing MongoDB backup file. Please Try again to restore the DB backup file"
        },
        apiAccess: {
            saveMessage: "Route api for api access management saved successfully",
            updateMessage: "Route api for api access management updated successfully",
            deleteMessage: "Route api for api access management deleted successfully",
            notFound: "Route api not found",
            alreadyExists: "Route api with same api route already exists",
            validationErrMessage: {
                routeApi: "Route api is required",
                roleName: "Role is required"
            }
        },
        authFail : {
            authFailMessage : "Authentication failed",
            tokenExpired : "Token Expired"
        },
        authorizationToken: {
            deleteMessage: "Authorization token deleted successfully",
            deleteAllMessage : "All authorization tokens deleted successfully",
            notFound: "Authorization token not found"
        },
        blog:{
            saveMessageBlog: "Blog article saved successfully",
            saveMessageCategory : "Blog Category saved successfully",
            saveMessageDocument : "Blog document saved successfully",
            updateMessageBlogMetaTag: "Blog SEO meta tag updated successfully",
            updateMessageCategory: "Blog category updated successfully",
            updateMessageBlog: "Blog updated successfully",
            updateMessageBlogDocument: "Blog document updated successfully",
            deleteMessageCategory: "Blog category deleted successfully",
            deleteMessageBlog: "Blog deleted successfully",
            deleteMessageBlogDocument: "Blog document deleted successfully",
            duplicateMessage: "",
            notFoundCategory: "Category not found",
            notFoundBlogArticle: "Blog article not found",
            notFoundTag: "Blog Tag not found",
            notFoundSeoTag: "Blog SEO Meta Tag not found",
            notFoundDoc: "Blog document not found",
            fieldRequiredCategory: "Blog category is required",
            fieldRequiredDocument: "Please upload document file",
            alreadyExistsBlog: "Blog with same title already exists",
            alreadyExistsCategory : "Blog category with same name already exists",
            categoryDeleteDeny: "Blog category cannot be deleted since it contains blog articles.",
            validationErrMessage:{
                blogTitle : "Title for blog article is required",
                blogDescription : "Blog description is required",
                status : "Status of blog is required",
                author : "Blog author is required",
                documentTitle : "Document title is required"
            }
        },
        cloudinary:{
            saveMessage: "Cloudinary setting saved successfully",
            updateMessage: "Cloudinary setting updated successfully",
            notFound: "Cloudinary Setting not found",
            alreadyExists: "You can only update cloudinary setting",
            validationErrMessage:{
                cloudinaryCloudName : "Cloudinary cloud name is required",
                cloudinaryApiKey : "Cloudinary api key is required",
                cloudinaryApiSecret : "Cloudinary api secret is required"
            }
        },
        commentSetting : {
            saveMessageCommentSetting : "Comment setting saved successfully",
            updateMessageCommentSetting: "comment setting updated successfully",
            notFoundCommentSetting: "comment setting not found",
            fieldRequiredCommentSettingDisqusURL: "Disqus URL is required",
            alreadyExistsCommentSetting : "comment setting already exists. You can only update the data once data is inserted. "

        },
        contact:{
            saveMessage: "Contact registered successfully",
            deleteMessage: "Contact deleted successfully",
            notFound: "Contact not found",
            validationErrMessage:{
                fullName : "Full name is required",
                email : "Email is required",
                emailValid : "Invalid email ID",
                message : "message is required"
            }
        },
        defaultApp:{
            alreadyExists: "Default user already exists",
            successMessage : "Default user created successfully",
            failureMessage : "Default user creation failed"

        },
        emailTemplate:{
            saveMessage: "Email template saved successfully",
            updateMessage: "Email template updated successfully",
            deleteMessage: "Email template deleted successfully",
            notFound: "Email template not found",
            fieldRequired: "Email template title is required",
            alreadyExists: "Email template with same title already exists",
            validationErrMessage:{
                templateName : "Email template title is required",
                emailSubject : "Subject of email is required",
                emailFrom : "Email is required",
                emailFromValid : "Invalid Email",
                templateBody : "Content for Email template is required"
            }
        },
        emailService:{
            saveMessage: "Email service configuration saved successfully",
            updateMessage: "Email service configuration updated successfully",
            notFound: "Email service configuration not found",
            alreadyExists: "You can only update email service configuration setting",
            validationErrMessage:{
                serviceProviderType : "Email service provider is required",
                portValid : "Port should a valid Integer",
                domainValid : "Invalid domain",
                rateLimitValid : "Rate limit should be a valid integer",
                hostValid : "Host should be valid SMTP domain name"
            }
        },
        eventManager:{
            saveMessage: "Event saved successfully",
            updateMessage: "Event updated successfully",
            deleteMessage: "Event deleted successfully",
            invalidDateCompareMessage: "Start date cannot be greater than or equal to end date",
            notFound: "Event not found",
            fieldRequired: "",
            alreadyExists: "Event with same title already exists",
            validationErrMessage:{
                eventTitle : "Event title is required",
                eventDescription : "Event description is required",
                venue : "Venue of event is required",
                venueAddress : "Address for venue is required",
                startDate : "Event start date is required",
                startDateValid : "Invalid date",
                endDateValid : "Invalid date"
            }
        },
        errorLog:{
            deleteMessage: "Error Log deleted successfully",
            notFound: "Errors not found",
            emailAlreadySent: "All the error logs are already reported.",
            emailSentMessage: "Email containing error logs sent successfully"
        },
        errorMessage:{
            internalServerError : "Internal Server Error"
        },
        fileDelete : {
            fileDelete : 'File deleted successfully',
            fieldRequiredFile : 'No file specified',
            notFound: 'File not found'
        },
        login:{
            fieldRequired: "Username is required",
            invalidMessage: "Invalid credentials",
            accountNotConfirmed: "User account not confirmed. Please check your email and click on the link sent to you in the confirmation email to verify your account.",
            blockMessage: "You are currently blocked. Please check email forwarded to your email and click the link.",
            ipBlocked : "Your ip address has been blocked due to repeated entry of invalid login credentials",
            authProgress : "Authentication already in progress"

        },
        googleAnalytics:{
            saveMessage: "Google analytics saved successfully",
            updateMessage: "Google analytics updated successfully",
            notFound: "Google analytics configuration not found",
            notFoundConfigFile: "Google analytics configuration File not found",
            fieldRequiredJsonFile : "Please upload google analytics config json file",
            alreadyExists: "You can only update google analytics configuration",
            validationErrMessage:{
                trackingId : "Google analytics tracking ID is required",
                analyticsViewID : "Analytics View ID is required"
            }
        },
        googleMaps:{
            saveMessage: "Google maps configuration saved successfully",
            updateMessage: "Google maps configuration updated successfully",
            notFound: "Google maps configuration not found",
            alreadyExists: "You can only update google maps configuration setting",
            validationErrMessage:{
                placeName : "Location name is required",
                longitude : "Longitude of the location is required",
                longitudeValid : "Invalid longitude data format",
                latitude : "Latitude of the location is required",
                latitudeValid : "Invalid latitude data format",
                zoom : "Zoom for map is required",
                zoomValid : "Zoom must be an integer",
                mapType : "Type of the map is required",
                markerTitle : "Marker title for the map is required"
            }
        },
        htmlModule:{
            saveMessage: "Html content saved successfully",
            updateMessage: "Html content updated successfully",
            deleteMessage: "Html content deleted successfully",
            duplicateMessage: "Html content with same title already exists",
            notFound: "Html content not found",
            fieldRequired: "Html content title is required",
            alreadyExists: "Html content with same title already exists",
            validationErrMessage: {
                htmlContentTitle: "Title for html content is required",
                htmlModuleContent: "Html Content is required"
            }
        },
        imageGallery:{
            saveMessageAlbum: "Album saved successfully",
            updateMessageAlbum: "Album updated successfully",
            deleteMessageAlbum: "Album deleted successfully",
            saveMessageImage: "Gallery image saved successfully",
            updateMessageImage: "Gallery Image updated successfully",
            deleteMessageImage: "Gallery Image deleted successfully",
            updateMessageImageCover: "Cover image updated successfully",
            notFoundAlbum: "Album not found",
            notFoundGalleryImage: "Gallery image not found",
            fieldRequiredAlbum: "Album title is required",
            fieldRequiredImage: "Please upload image",
            alreadyExists: "Image gallery album with same title already exists",
            coverImageWarning: "Cover Image cannot be deleted."
        },
        imageSlider:{
            saveMessage: "Slider Image saved successfully",
            updateMessage: "Slider Image updated successfully",
            deleteMessage: "Slider Image deleted successfully",
            notFound: "Slider image not found",
            fieldRequired: "Please upload image",
            validationErrMessage:{
                imageAltText : "Alternative text for image is required"
            }
        },
        job:{
            saveMessageJob: "Job vacancy saved successfully",
            updateMessageJob: "Job vacancy updated successfully",
            deleteMessageJob: "Job vacancy deleted successfully",
            saveMessageDepartment: "Department saved successfully",
            updateMessageDepartment: "Department updated successfully",
            deleteMessageDepartment: "Department deleted successfully",
            saveMessageApplicant: "Job applicant saved successfully",
            updateMessageApplicant: "Job applicant updated successfully",
            deleteMessageApplicant: "Job applicant deleted successfully",
            duplicateMessage: "",
            notFoundApplicant: "Job applicant not found",
            notFoundDepartment: "Job department not found",
            notFoundJob: "Job not found",
            notFoundJobSetting: "Job setting not found",
            fieldRequiredDepartment: "Department name is required",
            alreadyExistsDepartment: "Department with same title already exists",
            validationErrMessage:{
                fullName : "Job applicant name is required",
                email : "Email is required",
                emailValid : "Invalid email",
                contactNumber : "Contact number is required",
                organizationName : "Organization name is required",
                fileSize : "Size of file is required",
                fileSizeValid : "Size of file must be a valid integer",
                jobTitle : "Job title is required",
                departmentId : "Department is required",
                noOfVacancy : "Number of vacancy is required",
                noOfVacancyValid : "Number of vacancy must be a valid integer",
                deadLineDate : "Deadline for job application is required",
                deadLineDateValid : "Deadline date should be a valid date",
                jobType : "Type of job is required",
                educationalQualification : "Educational qualification is required",
                jobSpecification : "Specifications for job is required",
                jobDescription : "Job description is required",
                jobExperience : "Job experience is required"
            }
        },
        news:{
            saveMessageNews: "News saved successfully",
            updateMessageNews: "News updated successfully",
            deleteMessageNews: "News deleted successfully",
            saveMessageNewsCategory: "News category saved successfully",
            updateMessageNewsCategory: "News category updated successfully",
            deleteMessageNewsCategory: "News category deleted successfully",
            saveMessageNewsImage: "News image saved successfully",
            updateMessageNewsImage: "News image updated successfully",
            deleteMessageNewsImage: "News image deleted successfully",
            notFoundNews: "News not found",
            notFoundNewsCategory: "News category not found",
            notFoundNewsImage: "News image not found",
            fieldRequiredNews: "News title is required",
            fieldRequiredNewsCategory: "Category title is required",
            fieldRequiredNewsImage: "Please upload news",
            alreadyExistsNews: "News with same title already exists",
            alreadyExistsCategory: "Category with same title already exists",
            coverImageWarning: "Cover image cannot be deleted",
            updateCoverImage: "Cover image updated successfully",
            categoryDeleteDeny: "News category cannot be deleted since it contains news articles.",
            validationErrMessage:{
                newsTitle : "News title is required",
                categoryID : "Category of news is required",
                newsDescription : "News description is required",
                newsDate : "News date is required",
                newsDateValid : "News date should be a valid date"
            }
        },
        organizationInfo:{
            saveMessage: "Organization information saved successfully",
            updateMessage: "Organization information updated successfully",
            notFound: "Organization information not found",
            alreadyExists: "You can only update organization information",
            validationErrMessage:{
                orgName : "Organization Name is required",
                country : "Country name is required",
                city : "City is required",
                streetAddress : "Street address is required",
                organizationEmail : "Email is required",
                organizationEmailValid : "Invalid Email",
                facebookURLValid : "Facebook url should be a valid url",
                twitterURLValid : "Twitter url should be a valid url",
                googlePlusURLValid : "Google-plus url should be a valid url",
                linkedInURLValid : "Linked-in url should be a valid url",
                youtubeURLValid : "Youtube url should be a valid url",
                instagramURLValid : "Instagram url should be a valid url"
            }
        },
        partner: {
            saveMessage: "Partner info saved successfully",
            updateMessage: "Partner info updated successfully",
            deleteMessage: "Partner info deleted successfully",
            notFound: "Partner info not found",
            alreadyExists: "Partner with same web url already exists",
            fieldRequiredImage: "Please upload partner logo image",
            validationErrMessage: {
                partnerName: "Partner Name is required",
                linkURL: "Web URL associate with the partner is required",
                webURLValid: "Web URL should be a valid url"
            }
        },
        passwordChangeVerify : {
            notFound : "Password change verify token not found",
            expired : "Password change verify token expired"
        },
        roleManager: {
            saveMessage: "User Role saved successfully",
            updateMessage: "User Role updated successfully",
            deleteMessage: "User Role deleted successfully",
            notFound: "User Role not found",
            adminRoleNotAllowedToDelete: "Admin role cannot be deleted",
            adminRoleNotAllowedToEdited: "Admin role cannot be edited",
            alreadyExists: "User Role with same name already exists",
            fieldRequiredRole: "Please enter Role Name"
        },
        roleAuthorize: {
            accessFailure: "You are not authorized to perform this action",
            apiAccessDenied: "You are not authorized to access this api route."
        },
        teamMember:{
            saveMessage: "Team member saved successfully",
            updateMessage: "Team member updated successfully",
            deleteMessage: "Team member deleted successfully",
            notFound: "Team member not found",
            fieldRequired: "Please provide email",
            alreadyExists: "Team member with same email already exists",
            sortMessage: "Hierarhchy order sorted successfully",
            validationErrMessage:{
                teamMemberName : "Team member name is required",
                email : "Email is required",
                emailValid : "Invalid Email",
                designation : "Designation of team member is required",
                facebookURLValid : "Facebook url should be a valid url",
                twitterURLValid : "Twitter url should be a valid url",
                gPlusURLValid : "Google-plus url should be a valid url",
                linkedInURLValid : "Linked-in url should be a valid url",
                hierarchyOrderValid : "Hierarchy order should be a valid integer"
            }
        },
        testimonial:{
            saveMessage: "Testimonial saved successfully",
            updateMessage: "Testimonial updated successfully",
            deleteMessage: "Testimonial deleted successfully",
            notFound: "Testimonial not found",
            validationErrMessage:{
                personName : "Person name is required",
                testimonialContent : "Content for testimonial is required",
                organization : "Organization name is required",
                emailValid : "Invalid Email",
                facebookURLValid : "Facebook url should be a valid url",
                twitterURLValid : "Twitter url should be a valid url",
                gPlusURLValid : "Google-plus url should be a valid url",
                linkedInURLValid : "Linked-in url should be a valid url",
                testimonialDateValid : "Invalid date"
            }
        },
        twoFactorAuthentication : {
            notVerified : "TOTP Token not verified",
            notFound : "TOTP token not found",
            verifySuccess : "Two factor authentication for user verified successfully",
            disabled : "Two factor authentication disabled for the account successfully"
        },
        userConfirm:{
            saveMessage: "User confirmed successfully",
            alreadyExists: "User already confirmed",
            notFound: "User confirmation token not found",
            expiredMessage: "User confirmation already expired. We have sent you a new confirmation email. Please check your email."

        },
        user:{
            saveMessage: "User saved successfully",
            updateMessage: "User updated successfully",
            deleteMessage: "User deleted successfully",
            passwordUpdateMessage: "Password changed successfully",
            securityAnswerMessage: "Security answer changed successfully",
            notFound: "User not found",
            fieldRequired: "Username is required",
            alreadyExists: "User with same username already exists",
            superAdminDeleteMessage: "superadmin cannot be deleted",
            blockStatusMessage: "User unblocked successfully",
            emailUpdateMessage: "User email updated successfully",
            passwordEqUsername : "Password must not contain the username",
            passwordChangeConfirmationEmail : "An email has been sent to your email address that contains the link to change your password.Please check your email",
            weakPassword : "Password is very weak. Please try the combination of lowercase alphabets, uppercase alphabets, numbers, symbols and a minimum of 8 characters long password",
            notAuthorizedForSecurityAnswerUpdate : "You are not authorized to change the password. Please enter the correct combination of data to be able to change the password",
            notAllowedToChangeSuperAdminPassword: "You are not allowed to change the password of superadmin user",
            notAllowedToChangeOthersPassword: "You are not allowed to change the password of other user",
            notAllowedToChangePassword: "You are not allowed to change the password",
            validationErrMessage:{
                firstName : "First name is required",
                lastName : "Last name is required",
                email : "Email is required",
                emailValid : "Invalid Email",
                userRole : "User role is required",
                password : "Password is required",
                securityQuestion : "Security question is required",
                securityAnswer : "Security answer is required"
            }
        },
        userUnBlock:{
            saveMessage: "User unblocked successfully",
            notFound: "User unblock token not found",
            expiredMessage: "User unblock token expired. We have sent you email to unblock your account. Please check your email.",
            alreadyExists: "User account already unblocked"
        }
    };
})();