<h1><i class="fa fa-envelope-o"></i> Email Services</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			This plugin lets NodeBB send emails via services.
		</blockquote>
	</div>
</div>

<hr />

<form role="form" class="email-service-settings">
	<fieldset>
		<div class="row">

			<div class="col-sm-12">
				<div class="form-group">
					<label for="highlightTheme">Choose email service</label>
					<select class="form-control" name="email_service" id="email_services">
						<!-- BEGIN services -->
						<option value="{services.name}">{services.name}</option>
						<!-- END services -->
					</select>
				</div>
			</div>			
			<div class="col-sm-12">
				<div class="form-group">
					<label for="email:service:username">User</label>
					<input type="text" class="form-control" id="email:service:username" name="email:service:username" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="email:service:password">Password</label>
					<input type="password" class="form-control" id="email:service:password" name="email:service:password" />
				</div>
			</div>
		</div>

		<button class="btn btn-lg btn-primary" id="save">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('email-service', $('.email-service-settings'));

		$('#save').on('click', function() {
			Settings.save('email-service', $('.email-service-settings'), function() {
				app.alert({
					alert_id: 'email-service',
					type: 'info',
					title: 'Settings Changed',
					message: 'Please reload your NodeBB to apply these changes',
					timeout: 5000,
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	});
</script>
