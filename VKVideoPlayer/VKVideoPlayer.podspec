Pod::Spec.new do |s|

  s.name         = "VKVideoPlayer"
  s.version      = "0.1.4"
  s.summary      = "VKVideoPlayer is customizable video player component that is able to play mp4, hls videos and display subtitles."

  s.description  = <<-DESC
                    * Fully customizable UI
                    * No full screen restrictions (have it any size and position you would like!)
                    * Display subtitles (SRT supported out of the box)
                    * Customize subtitles (use CSS for styling courtesy of DTCoreText)
                    * Supports HTTP Live Streaming protocol
                    * Orientation change support (even when orientation lock is enabled)
                    * Bulletproof event machine to easily integrate features like video ads
                    * Lots of delegate callbacks for your own logging requirements
                   DESC

  s.homepage     = "https://github.com/viki-org/VKVideoPlayer"
  s.screenshots  = "https://camo.githubusercontent.com/4258638f03f72effdd2e540b359bab11287fe289/687474703a2f2f656e67696e656572696e672e76696b692e636f6d2f696d616765732f626c6f672f766964656f5f706c617965725f72756e6e696e675f6d616e2e6a7067"

  s.license      = { :type => "Apache License, Version 2.0", :file => "LICENSE" }
  
  s.authors            = { 
    "Jarrold Ong" => "jarrold@gmail.com", 
    "Jonathan Ong" => "jonathan@viki.com", 
    "Keisuke Matsuo" => "matzo@viki.com" 
  }

  s.platform     = :ios, "5.0"
  s.ios.deployment_target = '5.0'
  s.source       = { :git => "https://github.com/viki-org/VKVideoPlayer.git", :tag => s.version.to_s }

  s.source_files = 'Classes/ios/*.{h,m}'

  s.ios.exclude_files = 'Classes/osx'
  s.osx.exclude_files = 'Classes/ios'
  s.public_header_files = 'Classes/**/*.h'

  s.resources = 'Assets/*.png' , 'Classes/ios/*.{xib}'
  
  s.frameworks = 'QuartzCore', 'MediaPlayer', 'AVFoundation'

  s.requires_arc = true

  s.dependency 'DTCoreText', '~> 1.6.11'
  s.dependency 'CocoaLumberjack', '~> 1.7.0'
  s.dependency 'VKFoundation', '0.1.1'

end
