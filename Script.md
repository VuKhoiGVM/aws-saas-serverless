# Kịch bản trình bày: Multi-Tenant Applications Using AWS Serverless Technologies

## Phần Mở đầu: Kể chuyện & Tạo tương tác

### Giới thiệu & Tương tác đầu tiên
- "Chào mọi người, hôm nay chúng ta sẽ nói về Multi-Tenant SaaS và AWS Serverless. Trước khi bắt đầu, mình muốn hỏi: Ai trong số các bạn đã từng nghe về hoặc làm việc với khái niệm SaaS rồi?"
- *(Chờ đợi phản hồi)*
- "Nếu có, bạn có thể chia sẻ một ứng dụng SaaS mà bạn hay sử dụng không?"
- *(Lắng nghe phản hồi và ghi nhận)*

### Câu chuyện về Salesforce
- "Tôi muốn bắt đầu bằng một câu chuyện về cách ngành phần mềm đã thay đổi hoàn toàn từ năm 1999..."
- "Trước khi Salesforce xuất hiện, các công ty muốn có hệ thống CRM cần phải:
  * Mua phần cứng đắt tiền
  * Cài đặt phần mềm CRM phức tạp
  * Thuê đội ngũ IT để bảo trì
  * Tự xử lý các bản cập nhật và vá lỗi"
  
- "Marc Benioff, người sáng lập Salesforce, đã có một ý tưởng đột phá: Tại sao không cung cấp CRM qua internet, như một dịch vụ? Điều này đã làm thay đổi hoàn toàn cách doanh nghiệp sử dụng phần mềm:"
  * Truy cập qua trình duyệt
  * Trả phí theo tháng thay vì chi phí lớn ban đầu
  * Nhận cập nhật tự động
  * Mở rộng hoặc thu hẹp quy mô sử dụng khi cần

### Sự tiến hóa của mô hình dịch vụ

- "Để hiểu rõ hơn về SaaS, hãy xem xét sự tiến hóa của các mô hình dịch vụ đám mây qua ví dụ tòa nhà chung cư:"

- **Infrastructure as a Service (IaaS)**
  * "Trong tòa nhà của chúng ta: Bạn thuê một căn hộ trống với các tiện ích cơ bản được kết nối."
  * "Trong điện toán đám mây: Bạn nhận được máy chủ ảo, lưu trữ và mạng."
  * "Trách nhiệm của bạn: Mọi thứ từ hệ điều hành trở lên."
  * "Ví dụ: AWS EC2, Azure VMs, Google Compute Engine."
  
- **Platform as a Service (PaaS)**
  * "Trong tòa nhà của chúng ta: Bạn thuê một căn hộ đầy đủ nội thất với các tiện nghi cơ bản."
  * "Trong điện toán đám mây: Bạn nhận được một nền tảng đã được cấu hình sẵn để xây dựng ứng dụng."
  * "Trách nhiệm của bạn: Chỉ cần mã ứng dụng và dữ liệu của bạn."
  * "Ví dụ: AWS Elastic Beanstalk, Google App Engine."

- **Software as a Service (SaaS)**
  * "Trong tòa nhà của chúng ta: Bạn thuê một căn hộ dịch vụ được quản lý đầy đủ với mọi thứ đều được bao gồm."
  * "Trong điện toán đám mây: Bạn sử dụng các ứng dụng có sẵn qua internet."
  * "Trách nhiệm của bạn: Chỉ là dữ liệu của bạn và cách bạn sử dụng ứng dụng."
  * "Ví dụ: Salesforce, Microsoft 365, Google Workspace và các ứng dụng SaaS Việt Nam mà chúng ta đã đề cập."

### Mở rộng với các ví dụ thực tế
- "Ngày nay, chúng ta thấy mô hình này ở khắp mọi nơi: Microsoft 365, Google Workspace, Shopify..."
- "Tại Việt Nam, chúng ta có những ví dụ như MISA (phần mềm kế toán), Base.vn (quản lý nhân sự), KiotViet (quản lý bán lẻ), VNPay (dịch vụ thanh toán), ezCloud (quản lý khách sạn)."
- "Các bạn có thể kể tên thêm các ứng dụng SaaS khác mà bạn biết không?"
- *(Lắng nghe phản hồi)*

### Chuyển tiếp vào nội dung
- "Hôm nay, chúng ta sẽ khám phá cách xây dựng các ứng dụng SaaS hiện đại sử dụng công nghệ serverless của AWS. Thay vì đi sâu vào lý thuyết, chúng ta sẽ học thông qua các bài lab thực tế và tôi sẽ giải thích các khái niệm quan trọng khi chúng xuất hiện."

## Phần Chính: Các khái niệm SaaS & Bài thực hành

### Giới thiệu ví dụ tòa nhà chung cư
- "Trước khi bắt đầu các bài lab, tôi muốn giới thiệu một ví dụ trực quan giúp các bạn hiểu SaaS dễ dàng hơn - đó là ví dụ về tòa nhà chung cư."
- "Trong ví dụ này:"
  * Tòa nhà chung cư = Ứng dụng SaaS
  * Các căn hộ = Không gian dành cho các tenant (khách hàng)
  * Người quản lý tòa nhà = Nhà cung cấp SaaS
  * Cơ sở hạ tầng chung (thang máy, hành lang) = Tài nguyên dùng chung
  * Khóa cửa căn hộ = Cơ chế isolation giữa các tenant

### Hai mặt của SaaS

- "SaaS mang lại những lợi ích đáng kể nhưng cũng đặt ra những thách thức đáng chú ý:"

- **Lợi ích**
  * "Loại bỏ đầu tư ban đầu và gánh nặng IT thông qua truy cập dựa trên đăng ký"
  * "Cập nhật tự động và truy cập từ mọi nơi"
  * "Triển khai nhanh và mở rộng liền mạch"
  * "Đảm bảo cải tiến liên tục"

- **Thách thức**
  * "Chấp nhận giảm kiểm soát đối với các tính năng và lo ngại về bảo mật"
  * "Phụ thuộc vào internet và có thể có chi phí lâu dài cao hơn"
  * "Tùy chọn tùy chỉnh hạn chế và khó khăn khi chuyển đổi nhà cung cấp"
  * "Các vấn đề về tuân thủ đối với các ngành được quản lý"

### AWS Serverless Technologies

- "AWS cung cấp một hệ sinh thái đầy đủ các công nghệ serverless để xây dựng ứng dụng SaaS:"

- **Amazon Cognito**: "Quản lý xác thực và phân quyền cho tenant (như hệ thống kiểm soát truy cập của tòa nhà)"
- **Amazon API Gateway**: "Quản lý API với ngữ cảnh tenant (như sảnh và lễ tân của tòa nhà)"
- **AWS Lambda**: "Tính toán serverless với cô lập tenant (như dịch vụ của tòa nhà)"
- **Amazon DynamoDB**: "Lưu trữ dữ liệu đa tenant (như kho lưu trữ của tenant)"
- **AWS CloudFormation/CDK**: "Cơ sở hạ tầng dưới dạng mã (như bản thiết kế tòa nhà)"
- **AWS CloudWatch**: "Giám sát với nhận thức về tenant (như hệ thống quản lý tòa nhà)"
- **AWS IAM**: "Kiểm soát truy cập chi tiết (như hệ thống an ninh)"

### Lab 1: Basic Serverless Web Application
- **Câu hỏi tương tác**: "Theo các bạn, một ứng dụng web serverless cơ bản cần những thành phần gì?"
- *(Lắng nghe và ghi nhận ý kiến)*
- **Vấn đề**: "Chúng ta cần một nền tảng cơ bản cho ứng dụng multi-tenant"
- **Phân tích**: "Kiến trúc hiện tại còn thiếu gì để trở thành một ứng dụng SaaS thực thụ?" 
- **Demo**: Triển khai kiến trúc serverless cơ bản với xác thực
- **Kết nối khái niệm**: "Như trong tòa nhà chung cư, đây là phần móng và khung của tòa nhà - nền tảng cơ bản để xây dựng ứng dụng SaaS của chúng ta."

### Lab 2: Shared Services Layer
- **Câu hỏi tương tác**: "Khi nhiều tenant (khách hàng) cùng sử dụng một ứng dụng, làm thế nào để chúng ta quản lý các dịch vụ chung một cách hiệu quả?"
- *(Lắng nghe và ghi nhận ý kiến)*
- **Vấn đề**: "Cần có các chức năng chung cho tất cả tenant"
- **Demo**: Triển khai các microservices dùng chung với tenant context
- **Kết nối khái niệm**: "Đây giống như các tiện ích chung của tòa nhà - thang máy, hành lang, hệ thống điện nước - tất cả người thuê đều sử dụng nhưng cần được quản lý hiệu quả."

### Lab 3: Multi-Tenant Implementation
- **Câu hỏi tương tác**: "Làm thế nào để một codebase có thể phục vụ nhiều khách hàng khác nhau?"
- **Vấn đề**: "Cần hỗ trợ nhiều khách hàng trên cùng một codebase"
- **Demo**: Thêm các pattern tenant isolation vào API và data layers
- **Kết nối khái niệm**: "Đây là cách chúng ta thiết kế các căn hộ trong tòa nhà - chúng chia sẻ cùng một thiết kế cơ bản nhưng mỗi căn là một không gian riêng biệt cho từng người thuê."

### Lab 4: Tenant Isolation
- **Câu hỏi tương tác**: "Điều gì xảy ra nếu tenant A có thể truy cập dữ liệu của tenant B?"
- **Vấn đề**: "Cần ngăn chặn truy cập chéo giữa các tenant"
- **Demo**: Triển khai các biện pháp kiểm soát quyền truy cập và phân vùng dữ liệu
- **Kết nối khái niệm**: "Đây chính là hệ thống khóa cửa trong tòa nhà - đảm bảo mỗi người chỉ có thể vào căn hộ của mình, không thể vào căn hộ của người khác."

### Lab 5: Tiered Deployment Strategies
- **Câu hỏi tương tác**: "Làm thế nào để cung cấp các mức dịch vụ khác nhau cho các khách hàng khác nhau?"
- **Vấn đề**: "Các loại tenant khác nhau cần các mức dịch vụ khác nhau"
- **Demo**: Triển khai các tier tenant với phân bổ tài nguyên khác nhau
- **Kết nối khái niệm**: "Giống như trong tòa nhà có các loại căn hộ khác nhau - studio, một phòng ngủ, hai phòng ngủ, penthouse - mỗi loại có giá và tiện nghi khác nhau."

### Lab 6: Tenant Throttling and Quotas
- **Câu hỏi tương tác**: "Điều gì xảy ra khi một tenant sử dụng quá nhiều tài nguyên, ảnh hưởng đến các tenant khác?"
- **Vấn đề**: "Cần ngăn chặn vấn đề 'hàng xóm ồn ào'"
- **Demo**: Triển khai giới hạn sử dụng và throttling cho mỗi tenant
- **Kết nối khái niệm**: "Đây giống như quy định về tiếng ồn và số lượng khách trong tòa nhà - đảm bảo không ai sử dụng quá nhiều tài nguyên chung và ảnh hưởng đến người khác."

### Lab 7: Cost Attribution
- **Câu hỏi tương tác**: "Làm thế nào để biết được chi phí cụ thể mà mỗi tenant tạo ra?"
- **Vấn đề**: "Cần theo dõi việc sử dụng tài nguyên theo từng tenant"
- **Demo**: Triển khai tagging và monitoring theo tenant
- **Kết nối khái niệm**: "Giống như hệ thống đồng hồ điện, nước riêng trong mỗi căn hộ - cho phép tính toán chi phí chính xác cho từng người thuê."

## Phần kết: Tổng kết và Q&A

### Tóm tắt những điểm chính
- "Chúng ta đã đi từ mô hình phần mềm truyền thống đến SaaS và giờ là Serverless SaaS"

### Tại sao chọn Serverless SaaS?

- "Serverless SaaS kết hợp những lợi thế của SaaS và Serverless, tạo ra giá trị độc đáo:"

1. **Hiệu quả Chi phí**
   - "Chỉ trả tiền cho việc sử dụng thực tế của tenant, như thanh toán tiện ích dựa trên mức tiêu thụ thực tế"
   - "Không có chi phí cho cơ sở hạ tầng không hoạt động, tương tự như không phải trả tiền điện cho căn hộ trống"
   - "Tự động mở rộng dựa trên nhu cầu của tenant, như thang máy điều chỉnh tốc độ trong giờ cao điểm"

2. **Đơn giản trong Vận hành**
   - "Không quản lý máy chủ, như cư dân không phải lo lắng về bảo trì tòa nhà"
   - "Tự động mở rộng, tương tự như khu vực chung mở rộng theo nhu cầu"
   - "Sẵn sàng cao tích hợp sẵn, như máy phát điện dự phòng và hệ thống nước dự phòng"

3. **Tập trung phát triển**
   - "Tập trung vào business logic không phải hạ tầng, như quản lý tòa nhà tập trung vào trải nghiệm người dùng thay vì hệ thống ống nước"
   - "Thời gian ra thị trường nhanh hơn, tương tự như các thành phần căn hộ đúc sẵn"

4. **Khả năng mở rộng theo tenant**
   - "Lưu lượng tenant cá nhân không ảnh hưởng đến những người khác, như dịch vụ thang máy riêng"
   - "Mỗi tenant có thể mở rộng độc lập với các tải công việc không thể dự đoán"
   - "Gán chi phí ở mức độ tenant, như hóa đơn riêng cho tiện ích"

### Mở phiên hỏi đáp
- "Đây là thời gian cho Q&A. Các bạn có câu hỏi gì về những khái niệm hoặc các bài lab mình vừa trình bày không?"
- *(Chờ đợi và trả lời câu hỏi)*

### Lời kết
- "Cảm ơn mọi người đã tham gia buổi chia sẻ hôm nay. Hy vọng các bạn đã có cái nhìn rõ hơn về cách xây dựng ứng dụng Multi-Tenant SaaS sử dụng công nghệ serverless của AWS."
- "Các bạn có thể tiếp tục tìm hiểu thêm thông qua tài liệu AWS và workshop mình đã giới thiệu."
- "Chúc các bạn thành công!"
