import 'package:flutter_test/flutter_test.dart';
import 'package:employee_portal_mobile/main.dart';

void main() {
  testWidgets('Employee Portal smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const EmployeePortalApp());

    // Verify that our login page shows up.
    expect(find.text('Welcome to Employee Portal'), findsOneWidget);
    expect(find.text('Username'), findsOneWidget);
    expect(find.text('Password'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);
  });
}