platform :ios, '5.1.1'
pod 'DTCoreText', '~> 1.6.11'
pod 'AFNetworking', '1.3.3'
pod 'CocoaLumberjack', '~> 1.7.0'
pod 'VKFoundation', '0.1.1'
pod 'CocoaHTTPServer'

target 'VKVideoPlayerTests' do
  pod 'Specta',      '~> 0.2.1'
  pod 'Expecta',     '~> 0.3.0'
  pod 'OCMock',      '~> 2.2.1'
  pod 'CocoaHTTPServer'
end

# Remove 64-bit build architecture from Pods targets
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |configuration|
      target.build_settings(configuration.name)['ARCHS'] = '$(ARCHS_STANDARD_32_BIT)'
    end
  end
end

